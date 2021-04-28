const createError = require("http-errors");
const Breeds = require("../models/BreedsFci.model");

// module.exports.list = (req, res, next) => {
//   console.log('get list fci')
//     Breeds.find()
//     .then((breeds) => {
//       if (!breeds) {
//         next(createError(404, "Brreds not found"));
//       } else {
//         res.json(breeds);
//       }
//     })
//     .catch(next);
// };

const options = {
  page: 1,
  limit: 10,
  collation: {
    locale: 'en',
  },
};

module.exports.list = (req, res, next) => {
  Breeds.paginate({}, { offset: 30, limit: 10 }).then(function (result) {
    res.json(result);
  })
    .catch(next);
};

