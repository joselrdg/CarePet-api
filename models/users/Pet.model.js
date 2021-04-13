const mongoose = require("mongoose");
const Veterinary = require("./Veterinary.model");
const Groomer = require("./Veterinary.Groomer");
const Residence = require("./Veterinary.Residence");
const Dogwalker = require("./Veterinary.Dogwalker");

const petSchema = mongoose.Schema(
  {
    pet: {
      species: {
        type: String,
        required: "Species is required",
      },
      name: {
        type: String,
      },
      chip: {
        type: String
      },
      breed: {
        type: String,
        required: "Breed is required",
      },
      hair: {
        type: String,
        required: "Hair is required",
      },
      capa: {
        type: String,
        required: "Capa is required",
      },
      sterilized: {
        type: String,
        required: "Sterilized is required",
      },
      datebirth: {
        type: Date
      },
      placelive: {
        type: String,
      },
      family: {
        type: String,
      }
    },
    carepet: {
      history: [{
        anamnesis: {
          type: String,
        }
      }],
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

petSchema.virtual("veterinary", {
  ref: Veterinary.modelName,
  localField: "_id",
  foreignField: "pet",
});
petSchema.virtual("groomer", {
  ref: Groomer.modelName,
  localField: "_id",
  foreignField: "pet",
});
petSchema.virtual("residence", {
  ref: Residence.modelName,
  localField: "_id",
  foreignField: "pet",
});
petSchema.virtual("dogwalker", {
  ref: Dogwalker.modelName,
  localField: "_id",
  foreignField: "pet",
});

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
