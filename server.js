const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const Appointment = require("./models/Appointment"); // Import the Appointment model

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;

// Middleware for enhanced security, logging, and compression
app.use(helmet()); // Enhances security by setting HTTP headers
app.use(compression()); // Compresses responses to reduce bandwidth
app.use(morgan("combined")); // Logs HTTP requests

// Connect to the MongoDB database using the MONGODB_URI from .env
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(bodyParser.json());

// Create an appointment
app.post("/appointments", async (req, res) => {
  try {
    const { title, date, description } = req.body;
    const newAppointment = new Appointment({ title, date, description });
    const savedAppointment = await newAppointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ error: "Failed to create appointment" });
  }
});

// Delete an appointment
app.delete("/appointments/:id", async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const deletedAppointment = await Appointment.findByIdAndRemove(appointmentId);
    if (!deletedAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.json({ message: "Appointment deleted" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ error: "Failed to delete appointment" });
  }
});

// Retrieve all upcoming appointments
app.get("/appointments", async (req, res) => {
  try {
    const currentDate = new Date();
    const upcomingAppointments = await Appointment.find({
      date: { $gte: currentDate },
    });
    res.json(upcomingAppointments);
  } catch (error) {
    console.error("Error retrieving appointments:", error);
    res.status(500).json({ error: "Failed to retrieve appointments" });
  }
});

// Serve a production-ready frontend (you can implement this part)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
