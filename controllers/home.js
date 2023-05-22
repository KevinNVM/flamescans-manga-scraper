// const fetch = require("node-fetch");
const fetch = require('cloudscraper');
const cheerio = require("cheerio");
const getIdFromUrl = require("../utils/getIdFromUrl");
const origin = require("../variables")?.origin;

module.exports = async () => {
  const url = origin;
  const response = await fetch(url);
  const data = await response.text();
  if (response.status !== 200) {
    throw new Error("Status: " + response.status);
  }
  const $ = cheerio.load(data);
  const results = [];

  $(".bixbox.hothome").each(function (i, elem) {
    const title = $(elem).find("h2").text().trim();
    const list = [];
    $(elem)
      .find(".pop-list-desktop .bs")
      .each(function (j, el) {
        const item = {};
        item["title"] = $(el).find(".tt").text().trim() || undefined;
        item["id"] = $(el).find("a").attr("href") || undefined;
        item["rating"] = $(el).find(".numscore").text().trim() || undefined;
        item["image"] = $(el).find("img").attr("src") || undefined;
        item["status"] =
          $(el).find(".imptdt .status i").text().trim() || undefined;

        item.rating =
          item.rating === "1010"
            ? 10
            : item.rating
            ? parseInt(item.rating[0])
            : item.rating;
        item.id = getIdFromUrl(item.id, true);
        list.push(item);
      });
    results.push({ title, list });
  });

  return results;
};
