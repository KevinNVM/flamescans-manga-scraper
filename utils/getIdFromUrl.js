module.exports = (str) => str?.match(/\d+-(.+)/)[1]?.replaceAll("/", "");
