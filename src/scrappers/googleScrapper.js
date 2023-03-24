const axios = require("axios");
const cheerio = require("cheerio");
const { matchLink } = require("../../matchLink");
const { appendToFile } = require("../helpers/createFile");

const googleScrapper = async () => {
  const url = "https://nbltop100.org/region/atlanta/";
  const request = await axios.get(url);
  const html = request.data;

  const $ = cheerio.load(html);

  $("a").each(function () {
    const link = $(this).attr("href");
    const value = matchLink(link)
    appendToFile("output.txt", value)
  });
};

googleScrapper();
