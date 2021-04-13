const mongoose = require("mongoose");
const User = require("./User.model");
const Anamnesis = require("./Anamnesis.model");
const Veterinary = require("./Veterinary.model");
const Groomer = require("./Veterinary.Groomer");
const Residence = require("./Veterinary.Residence");
const Dogwalker = require("./Veterinary.Dogwalker");

const petSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: User.modelName,
      required: true,
    },
    review: {
      species: {
        type: String,
        required: "Species is required",
      },
      name: {
        type: String,
      },
      chip: {
        type: String,
      },
      breed: {
        type: String,
        required: "Breed is required",
      },
      hair: {
        type: String,
        required: "Hair is required",
        enum: ["short", "long"],
      },
      color: {
        type: String,
        required: "Color is required",
      },
      specialpeculiarities: {
        type: String,
      },
      sterilized: {
        type: String,
        required: "Sterilized is required",
        enum: ["sterilized", "intact"],
      },
      datebirth: {
        type: Date,
      },
      habitat: {
        type: String,
        enum: ["indoor", "exterior", "reala", "finca", "workshop"],
      },
      family: {
        type: String,
        enum: ["family", "orphan",],
      },
      origin: {
        type: String,
        enum: ["urban", "rural"],
      },
      familyhistory: [{
        type: String
      }],
      allergies: [{
        type: String
      }],
      previousdiseases: [{
        type: String
      }],
      surgeries: [{
        type: String
      }]
    },
    carepet: {
      history: [
        {
          anamnesis: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: Anamnesis.modelName,
            required: true,
          },
          exploration:
        },
      ],
    },
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
