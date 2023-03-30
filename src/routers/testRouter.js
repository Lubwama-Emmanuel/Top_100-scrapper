const express = require("express")
const route = express.Router()
const controller = require("../scrappers/googleScrapper")

route.get("/send", controller.puppetFunction)