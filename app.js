const express = require("express");
const app = express();
const path = require("node:path");

/*
routes
(get) / main page --- display all the games (will filter by genre and studio)

(get) /game/:id --- display individual game details

(get) /game/create --- new game form
(post) /game/create --- submit new game form

(get) /game/:id/update --- update game form
(post) /game/:id/update --- submit game update form

(post) /game/:id/delete --- delete game

(get) /genre/create --- form to create a genre. No /genre to view genres list. They'll just be displayed below the form
(post) /genre/create --- submit genre create form

(get) /genre/update --- a dropdown of genre's to edit, and a text box to update
(post) /genre/update --- submit the form

(post) /genre/:name/delete -- delete a genre

(get) /studios --- game studio list
(get) /studio/:id --- individual studio view

(get) /studio/create --- form to create studio
(post) /studio/create --- submit new studio form

(get) /studio/:id/update --- form to update studio
(post) /studio/:id/update --- submit the update studio form

(post) /studio/:id/delete -- deletes the studio

// save platform for later

*/
// const usernamesRouter = require("./routes/usernamesRouter.js"); // routes for the game (add game, delete game, view game detail)
// const usernamesRouter = require("./routes/usernamesRouter.js"); // routes for the categories

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", usernamesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express app listening on port ${PORT}`);
});
