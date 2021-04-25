require("../config/db.config");
const mongoose = require("mongoose");

const Scraper = require("../models/Scraper.model");
const BreedsFci = require("../models/BreedsFci.model");

const browserObject = require('../scraper/browser');
const scraperPdfs = require('../scraper/index');
const pdfAObjt = require('../pdfparse/index')


// Urls de prueba
// const urlS = [["http://www.fci.be/Nomenclature/Standards/166g01-es.pdf", 'http://www.fci.be/Nomenclature/Standards/293g01-es.pdf', 'http://www.fci.be/Nomenclature/Standards/015g01-es.pdf']]


mongoose.connection.once("open", () => {
  console.info(
    `*** Connected to the database ${mongoose.connection.db.databaseName} ***`
  );
scraperPdfs()
.then((e)=>{
  console.log(e + ' Pdfs descargados');
  pdfAObjt(e)
  .then((data) => {
    console.log(data)
    BreedsFci.create(data)
    .then((e)=>{console.log(e);console.log('Razas guardadas en bd')})
    .catch((e) => console.error(e))
  })

})})
.catch((error) => console.error(error))

