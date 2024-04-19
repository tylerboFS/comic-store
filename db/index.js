///Connect to my comic-store database with Prisma
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getUserById = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch (err) {
    throw err;
  }
};

const getUserByUsername = async (username) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    return user;
  } catch (err) {
    throw err;
  }
};

const createUser = async (username, password) => {
  try {
    const user = await prisma.user.create({
      data: {
        username,
        password,
      },
    });

    return user;
  } catch (err) {
    throw err;
  }
};

const createCharacter = async (name, description) => {
  try {
    const character = await prisma.character.create({
      data: {
        name,
        description,
      },
    });

    return character;
  } catch (err) {
    throw err;
  }
};

const addComicToCharacter = async (comic, character) => {
  try{
    const updatedCharacter = await prisma.character.update({
      where : {
        id: character.id
      },
      data : {
        comics : { connect : comic}
      }
    });

    return updatedCharacter;
  }catch(err){
    throw err;
  }
}

const addCharatertoComic = async (comic, character) => {
  try{
    const updatedComic = await prisma.comic.update({
      where : {
        id: comic.id
      },
      data : {
        characters : { connect : character}
      }
    });

    return updatedComic;
  }catch(err){
    throw err;
  }
}
//   try {
//     const updatedCharacter = await prisma.character.update({
//       where: { id: character.id },
//       data: {
//         comics: { connect: comic },
//       },
//     });

//     return updatedCharacter;
//   } catch (err) {
//     throw err;
//   }
// };

const createComic = async ({ issueNumber, title, ownerId }) => {
  try {
    const comic = await prisma.comic.create({
      data: {
        issueNumber,
        title,
        ownerId,
      },
    });

    return comic;
  } catch (err) {
    throw err;
  }
};

const getAllComics = async () => {
  try {
    const rows = await prisma.comic.findMany();

    return rows;
  } catch (err) {
    throw err;
  }
};

const deleteComic = async (comicId) => {
  try {
    const comic = await prisma.comic.delete({
      where: {
        id: parseInt(comicId),
      },
    });

    console.log("Result after prisma delete:", comic);
    return comic;
  } catch (err) {
    console.log("ERROR", err);
    throw err;
  }
};

const getAllUsersComics = async (userId) => {
  try {
    const userWithComics = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        comics: true,
      },
    });

    return userWithComics.comics;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createUser,
  createComic,
  getAllComics,
  getUserById,
  getAllUsersComics,
  deleteComic,
  getUserByUsername,
  createCharacter,
  addComicToCharacter,
};
