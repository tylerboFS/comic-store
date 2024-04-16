const express = require("express");
const comicsRouter = express.Router();
const { getAllComics, createComic, getAllUsersComics } = require("../db");
const { requireUser } = require("./utils");

comicsRouter.get("/", async (req, res) => {
  try {
    //get all the comics
    const comics = await getAllComics();

    res.send(comics);
  } catch (err) {
    res.sendStatus(500);
  }
});

comicsRouter.get("/myComics", requireUser, async (req, res) => {
  try {
    const comics = await getAllUsersComics(req.user.id);

    res.send(comics);
  } catch (err) {
    res.sendStatus(500);
  }
});

comicsRouter.post("/", requireUser, async (req, res) => {
  try {
    //Get info from the body
    const { title, issueNumber } = req.body;
    //Insert into comics in the DB
    const newlyCreatedComic = await createComic({
      issueNumber,
      title,
      addedBy: req.user.id,
    });

    //send back success message
    res.send(newlyCreatedComic);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = comicsRouter;
