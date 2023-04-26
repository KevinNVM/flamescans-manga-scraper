const app = require("express").Router();

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

module.exports = app;
