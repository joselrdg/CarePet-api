const mongoose = require("mongoose");
const User = require("./User.model");
const Veterinary = require("./Veterinary.model");
const Groomer = require("./Groomer.model");
const Residence = require("./Veterinary.Residence");
const Dogwalker = require("./Veterinary.Dogwalker");

const petSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    wash: [
      {
        date: Date,
        days: String
      }
    ],
    haircut: [
      {
        date: Date,
        days: String
      }
    ],
    earcleaning: [
      {
        date: Date,
        days: String
      }
    ],
    teethcleaning: [
      {
        date: Date,
        days: String
      }
    ],
    vaccination: [
      {
        date: Date,
        days: String
      }
    ],
    deworming: [
      {
        date: Date,
        days: String
      }
    ],
    medication: [
      {
        name: String,
        dosage: String,
        startdate: Date,
        lastday: Date,
        hours: Number,
        notes: String
      }
    ],
    file: String,
    species: {
      type: String,
    },
    picture: {
      type: String,
    },
    name: {
      type: String,
    },
    chip: String,
    sex: String,
    breed: String,
    breedid: String,
    hair: {
      type: String,
    },
    color: {
      type: String,
    },
    specialpeculiarities: {
      type: String,
    },
    sterilized: {
      type: String,
    },
    datebirth: {
      type: Date,
    },
    washweek: Number,
    weigh: { date: Date, kg: Number },
    habitat: {
      type: String,
    },
    family: {
      type: String,
    },
    origin: {
      type: String,
    },
    familyhistory: [
      {
        type: String,
      },
    ],
    allergies: [
      {
        type: String,
      },
    ],
    previousdiseases: [
      {
        type: String,
      },
    ],
    surgeries: [
      {
        type: String,
      },
    ],
    carepet: {
      history: [
        {
          habitat: {
            origin: {
              type: String,
              enum: ["urban", "rural"],
            },
            place: {
              type: String,
              enum: [
                "indoor",
                "exterior",
                "garden",
                "meadow",
                "reala",
                "kennel",
              ],
            },
            outings: {
              out: {
                type: String,
                enum: ["leash", "offleash"],
              },
              place: {
                type: String,
                enum: ["street", "parks", "woods", "beach"],
              },
            },
            otheranimals: [
              {
                num: {
                  type: Number,
                },
                species: {
                  type: String,
                  enum: [
                    "canine",
                    "feline",
                    "rodents",
                    "reptiles",
                    "amphibians",
                    "birds",
                  ],
                },
              },
            ],
            diet: {
              type: {
                type: String,
                enum: ["can", "homemade", "croquette"],
              },
              brand: {
                type: String,
              },
              product: {
                type: String,
              },
            },
          },
          exploration: {
            mucous: {
              type: String,
              enum: ["pink", "red", "pale", "cyanotic", "ichthyric"],
            },
            trc: {
              Number,
            },
            hydration: {
              Number,
            },
            fc: {
              Number,
            },
            fr: {
              Number,
            },
            pulse: {
              String,
            },
            temperature: {
              Number,
            },
            consciousness: {
              type: String,
              enum: ["alert", "depression", "delusional", "stupor", "coma"],
            },
            nutritional: {
              type: String,
              enum: [
                "cachexic",
                "underweight",
                "normal",
                "overweight",
                "obesity",
              ],
            },
          },
          media: {
            type: String,
            validate: {
              validator: (value) => {
                try {
                  const url = new URL(value);
                  return url.protocol === "http:" || url.protocol === "https:";
                } catch (err) {
                  return false;
                }
              },
              message: () => "Invalid image URL",
            },
          },
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
