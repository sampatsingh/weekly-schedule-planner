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
app.use(helmet());
app.use(compression());
app.use(morgan("combined"));

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

// Serve a production-ready frontend (you can implement this part)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
