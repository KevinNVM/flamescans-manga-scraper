const express = require("express");

// test deps
// const fetch = require("node-fetch");
const fetch = require('cloudscraper');

const app = express();
const PORT = process.env.PORT || 3000;
const down = process.env.down || false;

require("dotenv").config();

// Middleware for parsing JSON body
app.use(express.json());

// Routes
if (down) {
  app.use((req, res) => {
    res.send({
      status: 500,
      message: "API is down.",
    });
  });
}

app.use(require("./router/routes"));

// Testing for deployment
app.get("/test", async (req, res) => {
  const response = await fetch("https://flamescans.org", {
    headers: {
      "User-Agent":
        "Opera/8.67 (X11; Linux x86_64; en-US) Presto/2.10.178 Version/11.00",
    },
  });
  res.send(response);
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
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
