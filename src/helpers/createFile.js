const fs = require("fs");

// Always appending to file
exports.appendToFile = (filename, value) => {
  try {
    fs.appendFileSync(filename, value + "\n");
  } catch (err) {
    console.log("Failed ", err);
  }
};