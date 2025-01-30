require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const concertRoutes = require("./routes/concerts");
const authRoutes = require("./routes/auth"); 
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from public directory
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/kpop_concerts", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Register authentication routes for user login, registration, etc.
app.use("/api/v1/auth", authRoutes); 
app.use("/api/v1/k-pop_concerts", concertRoutes); 

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
