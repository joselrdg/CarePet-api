const browserObject = require('./browser');
const scraperController = require('./pageController');
const pagePdfScraper = require('./pagePdfScraper');
const pdfAObjt = require('../pdfparse/index')


let browserInstance = browserObject.startBrowser();

const urlS = [["http://www.fci.be/Nomenclature/Standards/166g01-es.pdf", 'http://www.fci.be/Nomenclature/Standards/293g01-es.pdf', 'http://www.fci.be/Nomenclature/Standards/015g01-es.pdf']]



// pagePdfScraper(browserInstance, urlS)
//     .then((r) => {
//         pdfAObjt(r)
//             .then((data) => { console.log(data)})
//     })
//     .catch((e) => console.error(e))

const scraperPdfs = () => new Promise(async (resolve, reject) => {
    scraperController(browserInstance)
        .then((d) => {
            pagePdfScraper(browserInstance, [d.group[9]])
                .then((r) => {
                    resolve(r)
                    // pdfAObjt(r)
                    //     .then((data) => { console.log(data); console.log('yeaaaaaaaaasiiiiiiiiiiiiiiiiii') })
                })
                .catch((e) => console.error(e))
        })
        .catch((e) => { console.error(e) })

}
)

module.exports = scraperPdfs;



