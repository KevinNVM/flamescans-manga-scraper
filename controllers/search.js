const fetch = require("node-fetch");
const cheerio = require("cheerio");
const getIdFromUrl = require("../utils/getIdFromUrl");
const origin = require("../variables")?.origin;

module.exports = async (search, page = 1) => {
  const url = `${origin}/page/${page}?s=${search}`;
  const response = await fetch(url);
  const data = await response.text();
  if (response.status !== 200) {
    throw new Error("Status: " + response.status);
  }
  const $ = cheerio.load(data);

  //

  const results = { results: [] };

  $(".bsx a").each(function () {
    const title = $(this).find(".tt").text().trim();
    const id = getIdFromUrl($(this).attr("href"), true);
    const rating = $(this).find(".numscore").text().trim();
    const status = $(this).find(".status i").text().trim();
    const image = $(this).find(".ts-post-image").attr("src");

    results.results.push({
      title,
      id,
      rating: rating === "1010" ? 10 : parseInt(rating[0]),
      status,
      image,
    });
  });

  const nextLink = $(".pagination .next");
  const nextPage = nextLink.length
    ? parseInt(nextLink.attr("href").match(/page\/(\d+)/)[1])
    : null;
  const lastPage = parseInt($(".pagination .page-numbers").last().text());

  return {
    page: parseInt(page),
    nextPage,
    lastPage,
    count: results.results.length,
    ...results,
  };
};
