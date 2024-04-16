///Connect to my comic-store database

const { Client } = require("pg");

const client = new Client(
  process.env.DATABASE_URL || "postgres://localhost:5432/comic-store"
);

const getUserById = async (id) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT * FROM users 
    WHERE id=$1;
  `,
      [id]
    );
    return user;
  } catch (err) {
    throw err;
  }
};

const createUser = async (username, password) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    INSERT INTO users(username, password)
    VALUES ($1, $2)
    RETURNING *;
    `,
      [username, password]
    );

    return user;
  } catch (err) {
    throw err;
  }
};

const createComic = async ({ issueNumber, title, addedBy }) => {
  try {
    const {
      rows: [comic],
    } = await client.query(
      `
      INSERT INTO comics("issueNumber", title, "addedBy")
      VALUES ($1, $2, $3)
      RETURNING *;
    `,
      [issueNumber, title, addedBy]
    );

    return comic;
  } catch (err) {
    throw err;
  }
};

const getAllComics = async () => {
  try {
    const { rows } = await client.query(`
    SELECT * FROM comics;
    `);

    return rows;
  } catch (err) {
    throw err;
  }
};

const deleteComic = async (comicId) => {
  try{
    const {rows: [comic]} = await client.query( 
      `
        DELETE FROM comics
        WHERE id=${comicId}
        RETURNING *;
      `
    )
    return comic;
  }
  catch(err){
    throw err;
  }
}

const getAllUsersComics = async (userId) => {
  try {
    const { rows } = await client.query(`
    SELECT * FROM comics WHERE addedBy=${userId};
    `);

    return rows;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  client,
  createUser,
  createComic,
  getAllComics,
  getUserById,
  getAllUsersComics,
  deleteComic
};
