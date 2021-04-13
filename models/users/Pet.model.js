const mongoose = require("mongoose");
const Veterinary = require("./Veterinary.model");

const petSchema = mongoose.Schema(
  {
    veterinary: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "veterinary",
      },
    ],
    groomer: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "groomer",
      },
    ],
    residence: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "residence",
      },
    ],
    dogwalker: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "dogwalker",
      },
    ],
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

petSchema.virtual("pets", {
  ref: Review.modelName,
  localField: "_id",
  foreignField: "pet",
});
petSchema.virtual("pets", {
  ref: Review.modelName,
  localField: "_id",
  foreignField: "pet",
});
petSchema.virtual("pets", {
  ref: Review.modelName,
  localField: "_id",
  foreignField: "pet",
});

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
