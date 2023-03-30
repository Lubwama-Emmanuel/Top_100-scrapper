const express = require("express");
const logger = require("morgan");
const { puppetFunction } = require("./src/scrappers/googleScrapper");

const app = express();

app.use(logger("dev"));

app.get("/send", puppetFunction);

app.get("/", (req, res) => {
  res.send("HEREYEH");
});
const port = 3000;
app.listen(port, () => {
  console.log(`---server running on ${port}`);
});
