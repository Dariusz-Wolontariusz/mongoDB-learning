const { MongoClient } = require('mongodb')

let dbConnection
const uri = 'mongodb+srv://Darek:<F0r00m0wicz>@cluster0.cwxx3vq.mongodb.net/?retryWrites=true&w=majority'
const compass = 'mongodb://127.0.0.1:27017/Bookstore'

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(compass)
      .then(client => {
        dbConnection = client.db()
        return cb()
      })
      .catch(err => {
        console.log(err)
        return cb(err)
      })
  },
  getDb: () => dbConnection
}