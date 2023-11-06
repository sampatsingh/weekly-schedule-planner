// models/Appointment.js
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  title: String,
  date: Date,
  description: String,
});

module.exports = mongoose.model("Appointment", appointmentSchema);
