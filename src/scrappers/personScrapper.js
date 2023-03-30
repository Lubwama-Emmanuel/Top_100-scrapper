const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const { appendToFile } = require("../helpers/createFile");

const personScrapper = async (url) => {
  try {
    // const url = "https://nbltop100.org/members/mitchell-albert-iii/";
    const request = await axios.get(url);
    const html = request.data;
    const $ = cheerio.load(html);

    let personName = [];
    let names;
    const personObj = new Object();

    // Get person's name
    $("#headline-185-1730212")
      .find("span")
      .each(function () {
        const name = $(this).text();
        personName.push(name);
      });

    // Get Address
    const businessName = $("#span-193-1730212").text();
    const phoneNumber = $("#span-202-1730212").text();
    const personName2 = personName.filter((el) => el != "");

    // names = personName2[0] + personName2[1];

    for (let i = 0; i < personName.length; i++) {
      personName[i].trim();
      if (i == 0) {
        names = personName[0] + " ";
      } else if (i > 0) {
        names += personName[i] + " ";
      }
    }
    console.log(names);

    personObj.Names = names;
    personObj.Business_Name = businessName;
    personObj.Phone_Number = phoneNumber;

    appendToFile("../files/final.txt", JSON.stringify(personObj));
    console.log(personObj);
  } catch (err) {
    console.log("AN ERROR ACCURED", err.stack);
  }
};

const readF = fs.readFileSync("../files/output.txt", "utf-8");
const persons = readF.split("\n");

for (let i = 0; i <= persons.length; i++) {
  personScrapper(persons[i]);
}
