const pt = require("puppeteer");
const fs = require("fs");
const { appendToFile } = require("../helpers/createFile");

exports.puppetFunction = (req, res) => {
  try {
    const scrapeInfiniteScrollItems = async (page, itemTargetCount) => {
      console.log("You request for: ", itemTargetCount);
      let items = [];

      while (itemTargetCount > items.length) {
        items = await page.evaluate(() => {
          const items = Array.from(
            document.querySelectorAll(
              "#_dynamic_list-11-1724843 > .ct-div-block > a"
            )
          );
          return items.map((item) => item.getAttribute("href"));
        });

        previousHeight = await page.evaluate("document.body.scrollHeight");
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
        await page.waitForFunction(
          `document.body.scrollHeight > ${previousHeight}`
        );
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      // console.log(items);
      return items;
    };

    (async () => {
      const browser = await pt.launch({
        headless: false,
      });
      const page = await browser.newPage();

      await page.goto("https://nbltop100.org/region/atlanta/");
      console.log("Started");

      const items = await scrapeInfiniteScrollItems(page, 24);

      console.log(items);

      for (const item of items) {
        appendToFile("output.txt", item);
      }

      await browser.close();
    })();

    res.send("WE finished");
  } catch (error) {
    console.log("An error occured", error);
  }
};
