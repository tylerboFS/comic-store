require('dotenv').config()
const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const { client } = require("./db");

const app = express();
const PORT = 8080;

client.connect();
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  // Log out everything on the body of the request
  console.log("<___BODY LOGGER START_____>");
  console.log(req.body);
  console.log("<___BODY LOGGER END_______>");
  next();
})

app.get("/", (req, res) => {
  res.send(`<h1>Comic Store</h1>`);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log("And btw Tyler's favorite food is " + process.env.FOOD);
});
