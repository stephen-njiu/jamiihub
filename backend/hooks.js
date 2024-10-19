import { auth, db } from './firebase.js';  // Make sure to import db
import { signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js"; 
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js"; // Import Firestore functions

// Function to display the user's name on the dashboard
const displayUserName = async () => {
    const userNameSpan = document.getElementById('user-name');

    // Get the currently logged-in user
    auth.onAuthStateChanged(async user => {
        if (user) {
            // User is signed in, get their Firestore document
            const userRef = doc(db, "users", user.uid); // Ensure 'db' is imported
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                const displayName = userData.fullname || user.email; // Use the fullname from Firestore
                userNameSpan.textContent = displayName; // Update the span with the user's name
            } else {
                console.error("No such user document!");
                userNameSpan.textContent = 'Guest';
            }
        } else {
            // No user is signed in, you can redirect to login or show a message
            userNameSpan.textContent = 'Guest';
        }
    });
};

// Call the function when the script loads
displayUserName();

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

document.getElementById("logout-button").addEventListener("click", () => {
    console.log("Logout button clicked."); // Check if this gets logged
    logout();
});
