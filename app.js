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
  res.status(500).send('Invalid document id')
 }
})

app.post('/books', (req, res) => {

  const book = req.body

  db.collection('books')
    .insertOne(book)
    .then(result => {
      res.status(201).json(book)
    })
    .catch(err => {
      res.status(500).send('Could not create a docoument')
    })
})

app.delete('/books/:id', (req, res) => {

  if(ObjectId.isValid(req.params.id)) {
    db.collection('books')
      .deleteOne({_id: ObjectId(req.params.id)})
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).send('Couldn\'t remove the document')
      })
  } else {
    res.status(500).send('Invalid document id')
  } 
})