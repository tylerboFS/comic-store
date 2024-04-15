const express = require("express");
const bcrypt = require("bcrypt");
const usersRouter = express.Router();
const { client } = require("../db");

usersRouter.get("/", (req, res) => {
  res.send("This is the root for /api/users");
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

    res.send({ id: user.id });
  } catch (err) {
    console.log("Error creating user", err);
    res.sendStatus(500);
  }
});

module.exports = usersRouter;
