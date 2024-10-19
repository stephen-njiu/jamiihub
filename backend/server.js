const express = require("express");
const cors = require("cors");
const multer = require("multer");
const admin = require("firebase-admin");

const app = express();
const port = 5000;

// Enable CORS for all routes
app.use(cors());

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(
    require("./config/originhackathon-comm-firebase-adminsdk-y1mv0-a38e483d93.json")
  ),
  storageBucket: "gs://originhackathon-comm.appspot.com",
});

// Multer setup
const upload = multer({ storage: multer.memoryStorage() }); // Store files in memory

app.post("/api/services", upload.single("serviceImage"), async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(403)
        .json({ success: false, message: "No token provided." });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid; // Get user ID from token

    // Use username directly from req.body
    const { username, serviceTitle, serviceDescription, serviceCategory, servicePrice, serviceLocation } = req.body;

    // Check if username is present
    if (!username) {
      return res.status(400).json({ success: false, message: 'Username is required.' });
    }

    // Check if file is present
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded." });
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
      return res
        .status(500)
        .json({ success: false, message: "Error uploading image" });
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
        const db = admin.firestore();
        const result = await db.collection("services").add(newService);
        console.log("Service inserted:", result.id);
        res
          .status(201)
          .json({
            success: true,
            message: "Service posted successfully",
            serviceId: result.id,
          });
      } catch (dbError) {
        console.error("Error inserting service into Firestore:", dbError);
        res
          .status(500)
          .json({
            success: false,
            message: "Error posting service to Firestore",
          });
      }
    });

    blobStream.end(req.file.buffer);
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ success: false, message: "Error posting service" });
  }
});

// Route to fetch user data
app.get("/api/users", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(403)
        .json({ success: false, message: "No token provided." });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid;

    const userSnapshot = await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .get();

    if (!userSnapshot.exists) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const userData = userSnapshot.data();
    res.status(200).json({ success: true, user: userData });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching user data" });
  }
});

// GET endpoint to retrieve all services
app.get("/api/services", async (req, res) => {
  try {
    const db = admin.firestore();
    const servicesSnapshot = await db.collection("services").get();

    if (servicesSnapshot.empty) {
      return res
        .status(404)
        .json({ success: false, message: "No services found." });
    }

    const services = [];
    servicesSnapshot.forEach((doc) => {
      services.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json({ success: true, services });
  } catch (error) {
    console.error("Error retrieving services:", error);
    res
      .status(500)
      .json({ success: false, message: "Error retrieving services" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
