const express = require("express");
const comicsRouter = express.Router();
const {
  getAllComics,
  createComic,
  getAllUsersComics,
  deleteComic,
} = require("../db");
const { requireUser } = require("./utils");

// PATH: /api/comics/
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

comicsRouter.delete("/:id", requireUser, async (req, res) => {
  try {
    const comicId = req.params.id;
    const result = await deleteComic(comicId);
    res.send(result);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = comicsRouter;
