const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries");

async function getGames(req, res) {
  const gameData = await db.getGamesList();
  // figuring out query strings, ?studio=Valve+Corporation&studio=Mojang+Studios&genre=First+Person+Shooter
  // outout in req.query is:
  //   [Object: null prototype] {
  //   studio: [ 'Valve Corporation', 'Mojang Studios' ],
  //   genre: 'First Person Shooter'
  // }
  console.log(req.query);
  console.log(gameData);
  res.render("index", { title: "List of games", games: gameData });
}

module.exports = getGames;
