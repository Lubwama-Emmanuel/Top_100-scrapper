const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const { appendToFile } = require("../helpers/createFile");


const personScrapper = async (url) => {
  try {
    // const url = "https://nbltop100.org/members/lynn-blasingame-olmert/";
    const request = await axios.get(url);
    const html = request.data;
    const $ = cheerio.load(html);

    let personName = [];
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
    const address = $("#span-223-1730212").text();
    const phoneNumber = $("#span-202-1730212").text();
    const personName2 = personName.filter((el) => el != "");
    const names = personName2[0] + personName2[1];

    personObj.Names = names;
    personObj.Business_Name = businessName;
    personObj.Address = address;
    personObj.Phone_Number = phoneNumber;

    appendToFile("../files/final.txt", JSON.stringify(personObj))
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
