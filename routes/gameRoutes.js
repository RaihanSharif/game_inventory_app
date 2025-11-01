// (get) /game/:id --- display individual game details

// (get) /game/create --- new game form
// (post) /game/create --- submit new game form

// (get) /game/:id/update --- update game form
// (post) /game/:id/update --- submit game update form

// (post) /game/:id/delete --- delete game

const { Router } = require("express");
const gamesController = require("../controllers/gameController");
const gamesRouter = new Router();

gamesRouter.get("/", gamesController);

module.exports = gamesRouter;
