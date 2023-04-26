const makeResponseObject = require("../utils/makeResponseObject");
const series = require("../controllers/series");
const details = require("../controllers/details");
const show = require("../controllers/show");
const artGallery = require("../controllers/artGallery");
const home = require("../controllers/home");
const search = require("../controllers/search");
const router = require("express").Router();

// Route for / endpoint
router.get("/", (req, res) => {
  res.json({
    message: "Welcome to `FlameScans` manga scraper",
    apiStatus: true,
    github: "https://github.com/KevinNVM/flamescans-manga-scraper",
    createdAt: "2023-04-26",
    updateAt: "2023-04-26",
  });
});

router.get("/home", async (req, res) => {
  try {
    res.json(makeResponseObject(await home()));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error:
        process.env.ENVIRONMENT === "production"
          ? "Internal Server Error"
          : error.message,
    });
  }
});

// Route for /search endpoint
router.get("/search/:search", async (req, res) => {
  try {
    res.json(
      makeResponseObject(await search(req.params.search, req.query.page))
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error:
        process.env.ENVIRONMENT === "production"
          ? "Internal Server Error"
          : error.message,
    });
  }
});

// Route for /series endpoint
router.get("/series", async (req, res) => {
  try {
    const queryString = req.url.split("?")[1];
    res.json(makeResponseObject(await series(queryString)));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error:
        process.env.ENVIRONMENT === "production"
          ? "Internal Server Error"
          : error.message,
    });
  }
});

// Route for /details endpoint
router.get("/details/:id", async (req, res) => {
  try {
    res.json(makeResponseObject(await details(req.params.id)));
  } catch (error) {
    res.status(500).json({
      error:
        process.env.ENVIRONMENT === "production"
          ? "Internal Server Error"
          : error.message,
    });
  }
});

// Route for /show endpoint
router.get("/show/:id", async (req, res) => {
  try {
    res.json(makeResponseObject(await show(req.params.id)));
  } catch (error) {
    res.status(500).json({
      error:
        process.env.ENVIRONMENT === "production"
          ? "Internal Server Error"
          : error.message,
    });
  }
});

// Route for /arts endpoint
router.get("/arts", async (req, res) => {
  try {
    res.json(makeResponseObject(await artGallery()));
  } catch (error) {
    res.status(500).json({
      error:
        process.env.ENVIRONMENT === "production"
          ? "Internal Server Error"
          : error.message,
    });
  }
});

module.exports = router;
