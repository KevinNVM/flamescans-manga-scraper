// !! Un-used code, Feel free to delete !! //

const express = require("express");

const app = express();

// Middleware for handling unknown routes
app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});

// Middleware for parsing JSON body
app.use(express.json());

// Route for /series endpoint
app.get("/series", async (req, res) => {
  try {
    // Code to get series data
    res.json({ data: "series data" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route for /details endpoint
app.get("/details", async (req, res) => {
  try {
    // Code to get series details
    res.json({ data: "series details" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route for /show endpoint
app.get("/show", async (req, res) => {
  try {
    // Code to show series details
    res.json({ data: "show series" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Error-handling middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal server error";
  res.status(status).json({ error: message });
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
