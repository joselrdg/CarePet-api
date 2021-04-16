const mongoose = require("mongoose");
const faker = require("faker");

const User = require("../models/User.model");
const Pet = require("../models/Pet.model");

require("../config/db.config");

mongoose.connection.once("open", () => {
  console.info(
    `*** Connected to the database ${mongoose.connection.db.databaseName} ***`
  );

  mongoose.connection.db
    .dropDatabase()
    .then(() => console.log("Database clear"))
    .then(() => {
      const users = [];

      users.push({
        email: 'josesietepicos@gmail.com',
        password: "123456Aa",
        name: 'jose',
      });

      for (let index = 0; index < 10; index++) {
        users.push({
          email: faker.internet.email(),
          password: "123456Aa",
          name: faker.name.findName(),
        });
      }

      return User.create(users);
    })
    .then((users) => {
      console.log(`${users.length} users created`);

      const pets = [];

      for (let index = 0; index < 20; index++) {
        pets.push({
          user: users[Math.floor(index / 2)]._id,
          review: {
            species: "dog",
            name: faker.name.firstName(),
            chip: "0123456789",
            breed: faker.animal.dog(),
            hair: "short",
            color: "gris",
            sterilized: "intact",
          },
        });
      }

      return Pet.create(pets);
    })
    .then((pets) => {
      console.log(`${pets.length} pets created`);
    })
    .then(() => console.info(`- All data created!`))
    .catch((error) => console.error(error))
    .finally(() => process.exit(0));
});
