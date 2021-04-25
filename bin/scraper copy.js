const mongoose = require("mongoose");
const Scraper = require("../models/Scraper.model");
require("../config/db.config");

const browserObject = require('../scraper/browser');
const scraperController = require('../scraper/pageController');

let browserInstance = browserObject.startBrowser();


// scraperController(browserInstance)
//   .then((d) => {
//     data = d
//     console.log('data en variable')
//   })
//   .catch((e) => { console.error(e) })

mongoose.connection.once("open", () => {
  console.info(
    `*** Connected to the database ${mongoose.connection.db.databaseName} ***`
  );
  scraperController(browserInstance)
  .then((data) => Scraper.create(data))
  .then(() => console.log('datos guardados'))
  .catch((error) => console.error(error))
  .finally(() => process.exit(0));
})
