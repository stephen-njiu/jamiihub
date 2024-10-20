const express = require("express");
const cors = require("cors");
const multer = require("multer");
const admin = require("firebase-admin");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const serviceAccount = require('./config/originhackathon-comm-firebase-adminsdk-y1mv0-6051d106a5.json');

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://originhackathon-comm.appspot.com",
});

const db = admin.firestore();

// Middleware for token verification
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ success: false, message: "No token provided." });
  }
  try {
    req.user = await admin.auth().verifyIdToken(token);
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Unauthorized." });
  }
};

// Route to get Google Maps API key
app.get('/maps-api-key', (req, res) => {
  res.json({ apiKey: process.env.GOOGLE_MAPS_API_KEY });
});

// Multer setup for file uploads
const upload = multer({ storage: multer.memoryStorage() }); // Store files in memory

// POST endpoint to create a new service
app.post("/api/services", verifyToken, upload.single("serviceImage"), async (req, res) => {
  const { username, serviceTitle, serviceDescription, serviceCategory, servicePrice, serviceLocation } = req.body;

  // Input validation
  if (!username || !serviceTitle || !serviceDescription || !serviceCategory || !servicePrice || !serviceLocation) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded." });
  }

  const bucket = admin.storage().bucket();
  const blob = bucket.file(`services/${Date.now()}_${req.file.originalname}`);
  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
    public: true,
  });

  blobStream.on("error", (error) => {
    console.error("Error uploading file:", error);
    return res.status(500).json({ success: false, message: "Error uploading image" });
  });

  blobStream.on("finish", async () => {
    const serviceImageURL = `https://storage.googleapis.com/${bucket.name}/services/${blob.name}`;
    const newService = {
      title: serviceTitle,
      description: serviceDescription,
      category: serviceCategory,
      price: servicePrice,
      location: serviceLocation,
      provider: username, // Set provider to username
      image: serviceImageURL,
      createdAt: admin.firestore.Timestamp.now(),
    };

    try {
      const result = await db.collection("services").add(newService);
      console.log("Service inserted:", result.id);
      res.status(201).json({
        success: true,
        message: "Service posted successfully",
        serviceId: result.id,
      });
    } catch (dbError) {
      console.error("Error inserting service into Firestore:", dbError);
      res.status(500).json({
        success: false,
        message: "Error posting service to Firestore",
      });
    }
  });

  blobStream.end(req.file.buffer);
});

// Route to fetch user data
app.get("/api/users", verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid; // Get user ID from verified token

    const userSnapshot = await db.collection("users").doc(userId).get();

    if (!userSnapshot.exists) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const userData = userSnapshot.data();
    res.status(200).json({ success: true, user: userData });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ success: false, message: "Error fetching user data" });
  }
});

// GET endpoint to retrieve all services
app.get("/api/services", async (req, res) => {
  try {
    const servicesSnapshot = await db.collection("services").get();

    if (servicesSnapshot.empty) {
      return res.status(404).json({ success: false, message: "No services found." });
    }

    const services = [];
    servicesSnapshot.forEach((doc) => {
      services.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json({ success: true, services });
  } catch (error) {
    console.error("Error retrieving services:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving services from the database.",
      error: error.message, // Include the error message
      stack: error.stack, // Optionally include the stack trace
    });
  }
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port${port}`);
});
