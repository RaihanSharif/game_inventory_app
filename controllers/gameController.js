const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries");

async function getGames(req, res) {
  const gameData = await db.getGamesList(
    ["First Person Shooter", "Open World"],
    ["Valve Corporation"]
  );
  // const gameData = await db.getAllGames();
  console.log(gameData);
  res.json(gameData);
}

module.exports = getGames;
