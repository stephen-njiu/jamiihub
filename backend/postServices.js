import { auth, db, storage } from "./firebase.js";
import { setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js";

// Function to post a service
const postService = async (serviceData, serviceImage) => {
  try {
    // Generate a unique service ID
    const serviceId = doc(db, "services").id;

    // 1. Upload service image to Firebase Storage
    const storageRef = ref(storage, `services/${serviceId}/${serviceImage.name}`);
    await uploadBytes(storageRef, serviceImage);
    const imageUrl = await getDownloadURL(storageRef);  // Get the download URL for the image

    // 2. Save the service data along with image URL to Firestore
    await setDoc(doc(db, "services", serviceId), {
      ...serviceData,                // Spread the form data
      serviceId: serviceId,          // Add the generated serviceId
      imageUrl: imageUrl,            // Store the uploaded image URL
      userId: auth.currentUser.uid,  // Associate service with the logged-in user
      createdAt: new Date()          // Optional: Add timestamp
    });

    console.log('Service posted successfully with ID:', serviceId);
    alert('Service posted successfully!');
  } catch (error) {
    console.error('Error posting service:', error);
    alert('Error posting service: ' + error.message);
  }
};

// Event listener for the service form submission
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('service-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form values
    const serviceData = {
      serviceTitle: document.getElementById('serviceTitle').value,
      serviceDescription: document.getElementById('serviceDescription').value,
      serviceCategory: document.getElementById('serviceCategory').value,
      servicePrice: document.getElementById('servicePrice').value,
      serviceLocation: document.getElementById('serviceLocation').value
    };

    const serviceImage = document.getElementById('serviceImage').files[0];  // File input

    // Check if the user is logged in
    const userId = auth.currentUser ? auth.currentUser.uid : null;
    if (userId) {
      // Call postService to store the service and upload the image
      await postService(serviceData, serviceImage);
    } else {
      alert("You must be logged in to post a service.");
    }
  });
});

// Function to fetch a service by serviceId
export const fetchService = async (serviceId) => {
  try {
    const docRef = doc(db, "services", serviceId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Service data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such service found!");
      return null; // Return null if no service is found
    }
  } catch (error) {
    console.error("Error fetching service:", error);
  }
};
