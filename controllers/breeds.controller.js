const createError = require("http-errors");
const Breeds = require("../models/BreedsFci.model");

module.exports.list = (req, res, next) => {
    Breeds.find()
    .then((breeds) => {
      if (!breeds) {
        next(createError(404, "Brreds not found"));
      } else {
        res.json(breeds);
      }
    })
    .catch(next);
};

