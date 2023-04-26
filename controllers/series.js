const fetch = require("node-fetch");
const cheerio = require("cheerio");
const getIdFromUrl = require("../utils/getIdFromUrl");
const origin = require("../variables")?.origin;

module.exports = async (queryString = "") => {
  try {
    const url = origin + `/series/?${queryString}`;
    const response = await fetch(url);
    const data = await response.text();
    if (response.status !== 200) {
      throw new Error("Status: " + response.status);
    }
    const $ = cheerio.load(data);

    //

    const comics = [];

    $(".bsx a").each((i, el) => {
      const title = $(el).find(".tt").text().trim();
      const thumbnail = $(el).find("img").attr("src");
      const rating = $(el).find(".numscore").text();
      const status = $(el).find(".status i").text();
      const id = getIdFromUrl($(el).attr("href"), true);

      comics.push({
        id,
        title,
        thumbnail,
        rating: rating === "1010" ? 10 : parseInt(rating[0]),
        status,
      });
    });

    const nextLink = $('a.r:contains("Next")');
    const pageNumber = url.includes("page=")
      ? parseInt(url.split("page=")[1])
      : 1;
    let nextPageNumber = null;
    if (nextLink.length > 0) {
      const nextPageUrl = new URLSearchParams(nextLink.attr("href")).get(
        "page"
      );
      nextPageNumber = nextPageUrl;
    }

    const output = {
      currentPage: pageNumber,
      nextPage: parseInt(nextPageNumber),
      type: new URLSearchParams(queryString).get("type") || "All",
      status: new URLSearchParams(queryString).get("status") || "All",
      order: new URLSearchParams(queryString).get("order") || "Default",
      count: comics.length,
      comics,
    };

    return output;
  } catch (error) {
    console.error(error);
  }
};
