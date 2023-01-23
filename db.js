const { MongoClient } = require('mongodb');

let dbConnection

module.exports = {
  connectToDb: () => {
    MongoClient.connect('mongodb://localhost:27017/bookstore')
      .then((client) => {
        dbConnection = client.db()
      })
      .catch(err => {
        console.log(err)
      })
  },
  getDb: () => dbConnection
}