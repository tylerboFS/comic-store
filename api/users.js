const express = require("express");
const bcrypt = require("bcrypt");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const { client, createUser, getUserById, getUserByUsername, getAllUsersComics } = require("../db");

const signToken = (username, id) => {
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "1w",
  });
  return token;
};

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
    const user = await getUserByUsername(username);

    //If there is no user send back a 401 Unauthorized
    if (!user) {
      res.sendStatus(401);
    } else {
      //Check the password against the hash
      const passwordIsAMatch = await bcrypt.compare(
        plainTextPassword,
        user.password
      );
      if (passwordIsAMatch) {
        //This is a valid log in

        const token = signToken(user.username, user.id);

        res.send({ message: "Succesfully Logged in", token });
      } else {
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

  try {
    //Create the user with the username and hashed password
    const user = createUser(username, hashedPassword);

    //Sign a token with user info
    const token = signToken(user.username, user.id);

    //Send back the token
    res.send({ message: "Successful Registration", token });
  } catch (err) {
    console.log("Error creating user", err);
    res.sendStatus(500);
  }
});

//   /api/users/:userID/comics
// get all of this user's comics
usersRouter.get("/:userId/comics", async (req, res) => {
  try{
    const comics = await getAllUsersComics(parseInt(req.params.userId));

    res.send(comics);
  }
  catch(err){
    console.log("Error getting user's comics", err);
    res.sendStatus(500);
  }
})

module.exports = usersRouter;
