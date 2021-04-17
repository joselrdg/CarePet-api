const createError = require("http-errors");
const Pet = require("../models/Pet.model");

module.exports.getAll = (req, res, next) => {
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
  const {id } = req.params
  console.log(id)
  Pet.findById(id)
    .then((pet) => {
      if (!pet) {
        next(createError(404, "Pet not found"));
      } else {
        console.log(pet)
        res.json(pet);
      }
    })
    .catch(next);
};

module.exports.list = (req, res, next) => {
  const { id } = req.params;
  console.log(req.currentUser);
  console.log("hola");
  Pet.find({ user: id })
    .then((pets) => {
      if (!pets) {
        next(createError(404, "Pet not found"));
      } else {
        console.log('mascotas encontrada');
        res.json(pets);
      }
    })
    .catch(next);
};

module.exports.create = (req, res, next) => {
  Pet.create(req.body)
    .then((pet) => res.status(201).json(pet))
    .catch(next);
};
