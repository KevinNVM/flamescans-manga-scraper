const fetch = require("node-fetch");
const cheerio = require("cheerio");
const origin = require("../variables")?.origin;
const getIdFromUrl = require("../utils/getIdFromUrl");

module.exports = async (id) => {
  try {
    const url = `${origin}/series/${id}`;
    const response = await fetch(url);
    const data = await response.text();
    if (response.status !== 200) {
      throw new Error("Status: " + response.status);
    }
    const $ = cheerio.load(data);

    //

    const title = $(".entry-title").text().trim();
    const alternativeTitles = $(".alternative .desktop-titles").text().trim();
    const posterSrc = $(".thumb img").attr("src");
    const genres = $(".genres-container .mgen a")
      .map((_, el) => $(el).text().trim())
      .get();
    const type = $(".tsinfo .imptdt").eq(0).find("i").text().trim();
    const status = $(".tsinfo .imptdt").eq(1).find("i").text().trim();
    const author = $(".tsinfo .imptdt").eq(3).find("i").text().trim();
    const artist = $(".tsinfo .imptdt").eq(4).find("i").text().trim();
    const serialization = $(".tsinfo .imptdt").eq(5).find("i").text().trim();
    const score = $(".numscore").html().trim();
    const synopsis = $(".summary .entry-content p:not(:empty)").text().trim();
    const chapters = [];

    $(".eplister ul li").each((i, elem) => {
      const id = getIdFromUrl($(elem).find("a").attr("href"));

      const label = $(elem).find(".chapternum").text().trim();
      const date = $(elem).find(".chapterdate").text().trim();
      chapters.push({ id, label, date });
    });

    const comic = {
      title,
      alternativeTitles,
      posterSrc,
      genres,
      type,
      status,
      author,
      artist,
      serialization,
      score: parseFloat(score),
      synopsis,
      chaptersCount: chapters.length,
      chapters,
    };

    return comic;
  } catch (error) {
    console.error(error);
  }
};
