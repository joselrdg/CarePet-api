const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://dbUser:cIr68iNo69@cluster0.orhlh.mongodb.net/test'

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.info(`Successfully connected to the database ${MONGODB_URI}`))
  .catch((error) => {
    console.error(`An error ocurred trying to connect to de database ${MONGODB_URI}`, error)
    process.exit(0)
  })

process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected on app termination')
    process.exit(0)
  })
})