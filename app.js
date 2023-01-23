const Express = require("express");

const app = Express();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening at the port nr ${PORT}`)
});

app.get('/books', (req, res) => {
  res.json('Welcome to my library')
})