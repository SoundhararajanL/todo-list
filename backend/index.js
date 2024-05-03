// index.js (Backend)

const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require("cors");
const expressRoutes = require('./TodoRouter');

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Use the expressRoutes middleware
app.use('/', expressRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Connect to MongoDB
mongoose.connect(process.env.MYDB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Handle MongoDB connection events
mongoose.connection.on("connected", () => {
  console.log("DB connected successfully");
});

mongoose.connection.on("error", (err) => {
  console.error("DB connection error:", err);
});
