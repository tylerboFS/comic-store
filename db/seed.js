//Put some initial data in the database
require('dotenv').config()
const { client } = require("./index");

//CREATE a Comics tabls

//DROP ANY EXISTING TABLES

const dropTables = async () => {
  try {
    console.log("Starting to drop tables...");

    await client.query(`DROP TABLE IF EXISTS comics`);

    console.log("Finished dropping tables");
  } catch (err) {
    console.log("Error dropping tables");
    throw err;
  }
};

const createTables = async () => {
  try {
    console.log("Starting to create tables...");

    await client.query(`
      CREATE TABLE comics (
        id SERIAL PRIMARY KEY,
        issueNumber INTEGER NOT NULL,
        title varchar(255) NOT NULL
      );
    `);

    console.log("Finished creating tables");
  } catch (err) {
    console.log("Error creating tables");
    throw err;
  }
};

const rebuildDB = async () => {
  try {
    client.connect();

    await dropTables();
    await createTables();

    client.end();
  } catch (err) {
    console.log("Error during rebuildDB");
    throw err;
  }
};

rebuildDB();
