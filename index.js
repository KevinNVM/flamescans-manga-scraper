const express = require("express");
const makeResponseObject = require("./utils/makeResponseObject");
const series = require("./controllers/series");
const details = require("./controllers/details");
const show = require("./controllers/show");

const app = express();

// Middleware for parsing JSON body
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to `FlameScans` manga scraper",
    apiStatus: true,
    github: "https://github.com/KevinNVM/flamescans-manga-scraper",
    createdAt: "26/04/2023",
  });
});

// Route for /series endpoint
app.get("/series", async (req, res) => {
  try {
    const queryString = req.url.split("?")[1];
    res.json(makeResponseObject(await series(queryString)));
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route for /details endpoint
app.get("/details/:id", async (req, res) => {
  try {
    res.json(makeResponseObject(await details(req.params.id)));
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route for /show endpoint
app.get("/show/:id", async (req, res) => {
  try {
    res.json(makeResponseObject(await show(req.params.id)));
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

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
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
