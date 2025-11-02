const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries");

async function getGames(req, res) {
  const gameData = await db.getGamesList(
    ["First Person Shooter", "Open World"],
    ["Valve Corporation"]
  );
  // figuring out query strings, ?studio=Valve+Corporation&studio=Mojang+Studios&genre=First+Person+Shooter
  // outout in req.query is:
  //   [Object: null prototype] {
  //   studio: [ 'Valve Corporation', 'Mojang Studios' ],
  //   genre: 'First Person Shooter'
  // }
  console.log(gameData);
  console.log(req.query);
  res.render("index", { title: "List of games", games: gameData });
}

module.exports = getGames;
