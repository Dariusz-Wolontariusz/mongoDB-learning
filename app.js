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
  res.json('Welcome to my library')
})