//Put some initial data in the database
require("dotenv").config();
const { createUser, createComic, createCharacter, addComicToCharacter } = require("./index");
const bcrypt = require("bcrypt");

const users = [];

const createUsers = async () => {
  try {
    console.log("Starting to create users...");

    const billy = await createUser(
      "billboy",
      await bcrypt.hash("BillyBoy", 10)
    );


    const frank = await createUser(
      "frankNFurter",
      await bcrypt.hash("frank", 10)
    );
    const suzie = await createUser("sushiGal", await bcrypt.hash("suzie", 10));

    users.push(billy);
    users.push(frank);
    users.push(suzie);

    console.log("Finished creating users...");
  } catch (err) {
    console.log("Error creating users");
    throw err;
  }
};

const createComicsAndCharacters = async () => {
  console.log("Starting creating comics...");
  try {
    const spiderMan_comic = await createComic({
      issueNumber: 102,
      title: "The Amazing Spiderman",
      ownerId: users[0].id,
    });
    const watchMen = await createComic({
      issueNumber: 1,
      title: "Watchmen",
      ownerId: users[0].id,
    });
    const superMan = await createComic({
      issueNumber: 55,
      title: "Superman",
      ownerId: users[1].id,
    });
    const xMen = await createComic({
      issueNumber: 101,
      title: "The Uncanny X-Men",
      ownerId: users[2].id,
    });
    const deadpool = await createComic({
      issueNumber: 23,
      title: "Deadpool",
      ownerId: users[2].id,
    })

    console.log("Finished creating comics...");

    console.log("Start creating characters...");

    const peterParker = await createCharacter("Peter Parker", "He's Spider-Man");
    const clarkKent = await createCharacter("Clark Kent aka Kal-El", "He's Superman");
    const wolverine = await createCharacter("Logan aka James Howlett", "He's Wolverine");
    const drManhattan = await createCharacter("Dr Manhattan", "He's blue and often nude");
    const wadeWilson = await createCharacter("Wade Wilson aka Deadpool", "Healing Factor, insane, breaks 4th wall");

    console.log("Finished creating characters...");
    

    console.log("Add characters to comics");
    await addComicToCharacter(spiderMan_comic, peterParker);
    await addComicToCharacter(spiderMan_comic, wolverine);
    await addComicToCharacter(xMen, wolverine);
    await addComicToCharacter(superMan, clarkKent);
    await addComicToCharacter(watchMen, drManhattan);
    await addComicToCharacter(superMan, drManhattan);
    await addComicToCharacter(deadpool, wadeWilson);
    await addComicToCharacter(deadpool, wolverine);



  } catch (err) {
    console.log("Error creating comics");
    throw err;
  }
};

const rebuildDB = async () => {
  try {
    await createUsers();
    await createComicsAndCharacters();
  } catch (err) {
    console.log("Error during rebuildDB");
    throw err;
  }
};

rebuildDB();
