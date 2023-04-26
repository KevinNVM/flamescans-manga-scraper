const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

require("dotenv").config();

// Middleware for parsing JSON body
app.use(express.json());

// Routes
app.use(require("./router/routes"));

// Middleware for handling unknown routes
app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});

// Error-handling middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal server error";
  res.status(status).json({ error: message });
});

// Start the server
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
