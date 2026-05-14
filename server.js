const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const schoolRoutes = require("./routes/schoolRoutes");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Fixes CORS issues
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parses urlencoded payloads

// Test DB Connection
const pool = require("./config/db");
pool.getConnection()
  .then((connection) => {
    console.log("MySQL Database Connected Successfully!");
    connection.release();
  })
  .catch((err) => {
    console.error("MySQL Database Connection Failed:", err.message);
  });

// Routes
app.use("/", schoolRoutes);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});