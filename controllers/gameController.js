const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries");

async function getGames(req, res) {
  const genreData = await db.getAllGenres();
  const studioData = await db.getAllStudios();

  let { genre } = req.query;
  let { studio } = req.query;
  if (!Array.isArray(genre)) {
    genre = [genre];
  }
  if (!Array.isArray(studio)) {
    studio = [studio];
  }
  const gameData = await db.getGamesList(genre, studio);
  console.log(genre);
  console.log(studio);
  res.render("index", {
    title: "List of games",
    games: gameData,
    studios: studioData,
    genres: genreData,
  });
}

module.exports = getGames;
