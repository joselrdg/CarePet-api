const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const breedsSchema = mongoose.Schema(
  {
    raza: [{type: String,
      required: "Breed is required",}],
    tamano: [String],
    img:[Object],
    origen: [String],
    fecha: [String],
    utilizado: [String],
    historia: [String],
    apariencia: [String],
    comportamiento: [String],
    cabeza: [String],
    craneal: [String],
    facial: [String],
    ojos: [String],
    orejas: [String],
    cuello: [String],
    cuerpo: [String],
    eanteriores: [String],
    eposteriores: [String],
    movimiento: [String],
    piel: [String],
    pelo: [String],
    color: [String],
    faltas: [String],
    graves: [String],
    descalificantes: [String]
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.img;
        return ret;
      },
    },
  }
);

breedsSchema.plugin(mongoosePaginate);


const BreedsFci = mongoose.model("BreedsFci", breedsSchema);

module.exports = BreedsFci;
