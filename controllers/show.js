const fs = require("fs");
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const makeResponseObject = require("../utils/makeResponseObject");
const origin = require("../variables")?.origin;

module.exports = async (id) => {
  try {
    const url = origin + id;
    const response = await fetch(url);
    const data = await response.text();

    if (response.status !== 200) {
      throw new Error("Status: " + response.status);
    }

    const $ = cheerio.load(data);

    //

    const imgSrcs = [];
    const title = $("h1.entry-title").text().trim();

    $("p img").each(function () {
      const src = $(this).attr("src");
      if (src) {
        imgSrcs.push(src);
      }
    });

    const output = makeResponseObject({
      id,
      title,
      count: imgSrcs.length,
      imgSrcs,
    });

    return output;
  } catch (error) {
    console.error(error);
  }
};
