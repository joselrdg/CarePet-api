const createError = require("http-errors");
const Pet = require("../models/Pet.model");

module.exports.list = (req, res, next) => {
  Pet.find()
    .then((pets) => {
      if (!pets) {
        next(createError(404, "Pet not found"));
      } else {
        res.json(pets);
      }
    })
    .catch(next);
};

module.exports.get = (req, res, next) => {
  if (!req.body === {}) {
    console.log(req);
    console.log("hola");
    Pet.find(req.body)
      .then((pet) => {
        if (!pet) {
          next(createError(404, "Pet not found"));
        } else {
          res.json(pet);
        }
      })
      .catch(next);
  }
};

module.exports.create = (req, res, next) => {
  Pet.create(req.body)
    .then((pet) => res.status(201).json(pet))
    .catch(next);
};
