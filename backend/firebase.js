// Import the necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBY-MNDLfjzuN41Wg56NYDPwNxwgnopJ9s", // Replace with your API key
  authDomain: "originhackathon-comm.firebaseapp.com", // Replace with your Auth domain
  projectId: "originhackathon-comm", // Replace with your Project ID
  storageBucket: "originhackathon-comm.appspot.com", // Replace with your Storage Bucket
  messagingSenderId: "707961341565", // Replace with your Messaging Sender ID
  appId: "1:707961341565:web:45f6e221d9ea2750b7d314" // Replace with your App ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log('Firebase initialized:', app); // Log to confirm initialization

// Initialize Firebase services
export const auth = getAuth(app);  // Firebase Authentication
export const db = getFirestore(app);  // Firestore Database

console.log('Auth initialized:', auth); // Log to confirm auth initialization
console.log('Firestore initialized:', db); // Log to confirm Firestore initialization
