require("../config/db.config");
const mongoose = require("mongoose");

const Scraper = require("../models/Scraper.model");
const BreedsFci = require("../models/BreedsFci.model");

const browserObject = require('../scraper/browser');
const scraperController = require('../scraper/pageController');
const pagePdfScraper = require('../scraper/pagePdfScraper');
const scraperPdfs = require('../scraper/index');
const pdfAObjt = require('../pdfparse/index')

let browserInstance = browserObject.startBrowser();

// Urls de prueba
const urlS = [["http://www.fci.be/Nomenclature/Standards/166g01-es.pdf", 'http://www.fci.be/Nomenclature/Standards/293g01-es.pdf', 'http://www.fci.be/Nomenclature/Standards/015g01-es.pdf']]


mongoose.connection.once("open", () => {
  console.info(
    `*** Connected to the database ${mongoose.connection.db.databaseName} ***`
  );
scraperPdfs()
.then((e)=>{
  console.log(e + ' Pdfs descargados');

// prueba procesar Pdfs de tmp a bs
  pdfAObjt(e)
  .then((data) => {
    console.log(data)
    BreedsFci.create(data)
    .then((e)=>{console.log(e);console.log('Razas guardadas en bd')})
    .catch((e) => console.error(e))
  })


  // // prueba. tener pdf en tmp
  // pagePdfScraper(browserInstance, urlS)
  //   .then((r) => {
  //     console.log('Descarga completa'); console.log(r);
  //     pdfAObjt(r)
  //       .then((data) => {
  //         console.log(data)
  //         BreedsFci.create(data)
  //         .then((e)=>{console.log(e);console.log('Razas guardadas en bd')})
  //         .catch((e) => console.error(e))
  //       })
  //   })
  //   .catch((e) => console.error(e))

  // scraperController(browserInstance)
  //   .then((data) => {
  //     pagePdfScraper(browserInstance, data.group)
  //     .then((r) => {
  //       console.log('Descarga completa'); console.log(r);
  //       pdfAObjt(r)
  //         .then((data) => {
  //           console.log(data)
  //           BreedsFci.create(data)
  //           .then((e)=>{console.log(e);console.log('Razas guardadas en bd')})
  //           .catch((e) => console.error(e))
  //         })
  //     })
  //   })
  //   .catch((error) => console.error(error))
  //   .finally(() => process.exit(0));
})})
.catch((error) => console.error(error))


// mongoose.connection.once("open", () => {
//   console.info(
//     `*** Connected to the database ${mongoose.connection.db.databaseName} ***`
//   );
//   scraperController(browserInstance)
//   .then((data) => Scraper.create(data))
//   .then(() => console.log('datos guardados'))
//   .catch((error) => console.error(error))
//   .finally(() => process.exit(0));
// })
