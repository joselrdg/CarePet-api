const createError = require("http-errors");
const Breeds = require("../models/BreedsFci.model");

module.exports.list = (req, res, next) => {
  console.log('list mascotas')
    Breeds.find()
    .then((breeds) => {
      console.log('hostia puutaaaaaaaaaaaa')
      if (!breeds) {
        next(createError(404, "Brreds not found"));
      } else {
        console.log('que coño pasa')
        res.json(breeds);
      }
    })
    .catch(next);
};
