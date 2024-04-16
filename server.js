require('dotenv').config()
const express = require("express");
const morgan = require("morgan");
// const ViteExpress = require("vite-express");
const bodyParser = require('body-parser');
const { client } = require("./db");
const apiRouter = require('./api');

const app = express();
const PORT = process.env.PORT || 8080;  

client.connect();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  console.log("<___BODY LOGGER START_____>");
  console.log(req.body);
  console.log("<___BODY LOGGER END_______>");
  next();
})

app.use('/api', apiRouter);

app.use(express.static(`./client/dist`));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log("And btw Tyler's favorite food is " + process.env.FOOD);
});
