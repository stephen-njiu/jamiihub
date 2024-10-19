import { auth } from './firebase.js';

// Function to display the user's name on the dashboard
const displayUserName = () => {
    const userNameSpan = document.getElementById('user-name');

    // Get the currently logged-in user
    auth.onAuthStateChanged(user => {
        if (user) {
            // User is signed in, get their display name or username
            const displayName = user.displayName || user.email; 
            userNameSpan.textContent = displayName; // Update the span with the user's name
        } else {
            // No user is signed in, you can redirect to login or show a message
            userNameSpan.textContent = 'Guest';
        }
    });
};

// Call the function when the script loads
displayUserName();
