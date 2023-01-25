const Express = require("express");
const { ObjectId } = require("mongodb")
const { connectToDb, getDb } = require("./db");

//intial app and middleware
const app = Express();
const PORT = 3000;

app.use(Express.json())

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

app.get('/books/:id', (req, res) => {
  
 if(ObjectId.isValid(req.params.id)) {
   db.collection('books')
     .findOne({_id: ObjectId(req.params.id)})
     .then(doc => {
       res.status(200).json(doc)
     })
     .catch(err => {
       res.status(500).json({err: 'Could not fetch the data'})
     })
 } else {
  res.status(500).send('The id isn\'t valid')
 }
})

