const createError = require("http-errors");
const Pet = require("../models/Pet.model");


module.exports.get = (req, res, next) => {
    Pet.findById(req.params.id)
      .then(pet => {
        if (!pet) {
          next(createError(404, 'Pet not found'))
        } else {
          res.json(pet)
        }
      })
      .catch(next)
  }

  module.exports.create = (req, res, next) => {
    Pet.create(req.body)
      .then(pet => res.status(201).json(pet))
      .catch(next)
  }