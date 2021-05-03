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
  const { id } = req.params;
  console.log(id);
  Pet.findById(id)
    .then((pet) => {
      if (!pet) {
        next(createError(404, "Pet not found"));
      } else {
        console.log(pet);
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
        console.log("Mascotas encontradas");
        res.json(pets);
      }
    })
    .catch(next);
};

module.exports.create = (req, res, next) => {
  console.log(req.file)
  console.log(req.body)
    if (req.file) {
      req.body.file = req.file.path;
    }
    Pet.create(req.body)
      .then((pet) => {
        console.log(pet)
        console.log("Created pet");
        res.status(201).json(pet);
      })
      .catch(next);
};

module.exports.deletePetUser = (req, res, next) => {
  const id = req.params.id
  console.log(id)
    Pet.findByIdAndRemove(id)
      .then((pet) => {
        console.log(pet)
        console.log("Deleted pet");
        res.status(201).json(pet);
      })
      .catch(next);
};

module.exports.editPetUser = (req, res, next) => {
  console.log(req.body);
  const id = req.params.id;
  Pet.findByIdAndUpdate(id, { $push: req.body }, { new: true })
    .then((p) => {
      console.log("Existe----------------------");
      if (p === null) {
        console.log('null');
        next(createError(404, "the pet could not be updated"));
      } else {
        console.log(id);
        Pet.findById(id).then((pet) => {
          console.log(pet);
          if (!pet) {
            console.log('No encontrado')
            next(createError(404, "Pet not found"));
          } else {
            res.json(pet);
          }
        });
      }
    })
    .catch((e) => {
      console.log("error actualizar");
      next(e);
    });
};

module.exports.editOnePetUser = (req, res, next) => {
  console.log(req.body);
  const id = req.params.id;
  Pet.findByIdAndUpdate(id, { ...req.body }, { new: true })
    .then((p) => {
      console.log("Existe----------------------");
      if (p === null) {
        console.log('null');
        next(createError(404, "the pet could not be updated"));
      } else {
        console.log(id);
        Pet.findById(id).then((pet) => {
          console.log(pet);
          if (!pet) {
            console.log('No encontrado')
            next(createError(404, "Pet not found"));
          } else {
            res.json(pet);
          }
        });
      }
    })
    .catch((e) => {
      console.log("error actualizar");
      next(e);
    });
};
