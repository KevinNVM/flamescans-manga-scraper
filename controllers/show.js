const fetch = require("node-fetch");
const cheerio = require("cheerio");
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
        if (
          src.includes(
            "https://flamescans.org/wp-content/uploads/2022/05/readonflamescans.png"
          ) ||
          src.includes(
            "https://flamescans.org/wp-content/uploads/2022/07/999black-KTL.jpg"
          ) ||
          src.includes("999black-KTL") ||
          src.includes("readonflamescans")
        )
          return;

        imgSrcs.push(src);
      }
    });

    const output = {
      id,
      title,
      count: imgSrcs.length,
      imgSrcs,
    };

    return output;
  } catch (error) {
    console.error(error);
  }
};
