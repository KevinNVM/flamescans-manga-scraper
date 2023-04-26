module.exports = (str, forSeries = false) =>
  forSeries
    ? str?.match(/\/series\/(\d+-)?(.+)\//)[2]?.replaceAll("/", "")
    : str?.match(/\/\d+-?(.+?)\/$/)[1]?.replaceAll("/", "");
