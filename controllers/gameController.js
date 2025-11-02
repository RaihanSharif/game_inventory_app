const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries");

async function getGames(req, res) {
  const gameData = await db.getGamesList();
  const genreData = await db.getAllGenres();
  const studioData = await db.getAllStudios();
  // figuring out query strings, ?studio=Valve+Corporation&studio=Mojang+Studios&genre=First+Person+Shooter
  // outout in req.query is:
  //   [Object: null prototype] {
  //   studio: [ 'Valve Corporation', 'Mojang Studios' ],
  //   genre: 'First Person Shooter'
  // }
  console.log(req.query);
  console.log(gameData);
  console.log(genreData);
  console.log(studioData);
  res.render("index", {
    title: "List of games",
    games: gameData,
    studios: studioData,
    genres: genreData,
  });
}

module.exports = getGames;
