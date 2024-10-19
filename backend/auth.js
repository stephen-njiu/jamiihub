import { auth, db } from "./firebase.js"; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js"; 


// Function to register the user with email and password
const registerUser = (email, password, fullname, username) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('User registered:', user);

      // Save additional user information to Firestore
      return setDoc(doc(db, "users", user.uid), {
        fullname: fullname,
        username: username,
        email: email,
        uid: user.uid
      });
    })
    .then(() => {
      console.log('User data stored in Firestore');
      window.location.href = "dashboard.html";  // Redirect to dashboard
    })
    .catch((error) => {
      console.error('Error during registration:', error.message);
      alert(error.message);
    });
};

// Listen to form submission for registration
document.getElementById('registration-form').addEventListener('submit', (e) => {
  e.preventDefault();  // Prevent form submission

  // Get form values
  const fullname = document.getElementById('fullname').value;
  const email = document.getElementById('email').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Call the register function
  registerUser(email, password, fullname, username);
});

// Listen to form submission for login
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();  // Prevent form from submitting normally

    // Get form values
    const email = document.getElementById('username').value;  // Assuming username is an email
    const password = document.getElementById('password').value;

    // Firebase sign-in
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // User is signed in
            const user = userCredential.user;
            console.log('User signed in:', user);
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.error('Error signing in:', errorMessage);
            alert(errorMessage);
        });
});

// Google sign-in
document.getElementById('google-signup').addEventListener('click', async () => {
  const provider = new GoogleAuthProvider();

  try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google signup successful!", user);
      
      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
          fullname: user.displayName,
          email: user.email,
          username: user.email.split('@')[0], // You can modify this to use a different username strategy
          uid: user.uid
      }, { merge: true });  // Use merge to update existing records

      // Redirect to the dashboard upon successful signup
      window.location.href = 'dashboard.html';
  } catch (error) {
      console.error("Error signing up with Google: ", error);
      alert("Google signup failed.");
  }
});

// Function to handle logout
const logout = async () => {
  try {
      await signOut(auth);
      console.log("User logged out successfully.");
      window.location.href = "login.html";
  } catch (error) {
      console.error("Error logging out: ", error.message);
      alert("Error logging out. Please try again.");
  }
};

// Add event listener for logout button
document.getElementById("logout-button").addEventListener("click", logout);