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
  Pet.find({ user: id })
    .then((pets) => {
      if (!pets) {
        next(createError(404, "Pet not found"));
      } else {
        console.log('Mascotas encontradas');
        res.json(pets);
      }
    })
    .catch(next);
};

module.exports.create = (req, res, next) => {
  if (req.body.user === req.currentUser)
  {Pet.create(req.body)
    .then((pet) => {console.log('Mascota creada'); res.status(201).json(pet)})
    .catch(next);}
};


module.exports.editPetUser = (req, res, next) => {
  console.log(req.body)
  const id = req.params.user
  Pet.findByIdAndUpdate(id, req.body,{new:true})
      .then((p) => {
        console.log(p)
          console.log('Existe----------------------')
      })
      .catch((e) => next(e));
}