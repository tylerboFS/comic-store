const express = require("express");
const bcrypt = require("bcrypt");
const usersRouter = express.Router();
const { client } = require("../db");

usersRouter.get("/", (req, res) => {
  res.send("This is the root for /api/users");
});

//Log in a user
usersRouter.post("/login", async (req, res) => {
  //they give me a username and password on the body
  const username = req.body.username;
  const plainTextPassword = req.body.password;

  //Does this user exist?
  try {
    const { rows: [user] } = await client.query(
    `
      SELECT * FROM users
      WHERE username = $1
    `,
      [username]
    );

    //If there is no user send back a 401 Unauthorized
    if(!user){
      res.sendStatus(401);
    }
    else{
      //Check the password against the hash
      const passwordIsAMatch = await bcrypt.compare(plainTextPassword, user.password);
      if(passwordIsAMatch){
        //This is a valid log in
        //WHAT NOW??
        //TODO: Send a JWT to the client
        res.send("This is a valid login");
      }else{
        res.sendStatus(401);
      }
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

});

//Create a user with a hashed password
usersRouter.post("/register", async (req, res) => {
  //they give me a username and password on the body
  const username = req.body.username;
  const plainTextPassword = req.body.password;

  //I need to hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);

  //I need to create the user with the username and hashed password
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users(username, password)
      VALUES ($1, $2)
      RETURNING *;
  `,
      [username, hashedPassword]
    );

    //TODO: Send back the JWT Token
    res.send({ id: user.id });
  } catch (err) {
    console.log("Error creating user", err);
    res.sendStatus(500);
  }
});

module.exports = usersRouter;
