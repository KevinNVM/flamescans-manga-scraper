const fetch = require("node-fetch");
const cheerio = require("cheerio");
const origin = require("../variables")?.origin;

module.exports = async () => {
  try {
    const url = `${origin}/art-gallery`;
    const response = await fetch(url);
    const data = await response.text();
    if (response.status !== 200) {
      throw new Error("Status: " + response.status);
    }
    const $ = cheerio.load(data);

    //

    const imageSrcList = [];

    $(".gallery-item img").each((index, element) => {
      const src = $(element).attr("src");
      imageSrcList.push(src);
    });

    return { count: imageSrcList.length, imageSrcList };
  } catch (error) {
    console.error(error);
  }
};
