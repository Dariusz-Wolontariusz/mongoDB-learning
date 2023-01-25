const Express = require("express");
const { connectToDb, getDb } = require("./db");

const app = Express();
const PORT = 3000;

//connecting to DB
let db

connectToDb((err) => {
  if (!err) {
    app.listen(PORT, () => {
      console.log(`Listening at the port nr ${PORT}`)
    })
    db = getDb()
  }
})



app.get('/books', (req, res) => {
  let books = []

  db.collection('books')
    .find()
    .sort({author: 1})
    .forEach(book => books.push(book))
    .then(() => {
      res.status(200).json(books)
    })
    .catch(() => {
      res.status(500).json({error: 'Could not fetch the documents'})
    })
})