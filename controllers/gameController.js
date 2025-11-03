const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries");

async function gamesListGet(req, res) {
  const genreData = await db.getAllGenres();
  const studioData = await db.getAllStudios();

  let { genre } = req.query;
  let { studio } = req.query;
  if (genre && !Array.isArray(genre)) {
    genre = [genre];
  }
  if (studio && !Array.isArray(studio)) {
    studio = [studio];
  }
  const gameData = await db.getGamesList(genre, studio);
  res.render("index", {
    title: "List of games",
    games: gameData,
    studios: studioData,
    genres: genreData,
  });
}

async function addGamePost(req, res) {
  console.log("req body");
  console.log(req.body);
  await db.insertGame(req.body);

  res.redirect("/");
}

module.exports = {
  gamesListGet,
  addGamePost,
};
