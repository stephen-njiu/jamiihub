import { auth, db } from "./firebase.js"; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Function to register the user with email and password
const registerUser = (email, password, fullname, username) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      console.log('User registered:', user);

      // Save additional user information to Firestore
      await setDoc(doc(db, "users", user.uid), {
        fullname: fullname,
        username: username,
        email: email,
        uid: user.uid
      });

      console.log('User data stored in Firestore');

      // Get the user's ID token
      const token = await user.getIdToken();
      console.log('User token:', token); // Log the token or save it to use later

      // Store the token in local storage or wherever needed
      localStorage.setItem('userToken', token); // Example of storing token in local storage

      window.location.href = "dashboard.html";  // Redirect to dashboard
    })
    .catch((error) => {
      console.error('Error during registration:', error.message);
      alert(error.message);
    });
};

document.addEventListener('DOMContentLoaded', () => {  
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
              username: user.email.split('@')[0],
              uid: user.uid
          }, { merge: true });

          // Redirect to the dashboard upon successful signup
          window.location.href = 'dashboard.html';
      } catch (error) {
          console.error("Error signing up with Google: ", error);
          alert("Google signup failed.");
      }
  });
});


