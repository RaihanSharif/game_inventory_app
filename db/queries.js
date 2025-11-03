const pool = require("./pool");

async function gamesFilteredByStudio(studioArr) {
  const result = await pool.query(
    "SELECT game.id, title, TO_CHAR(publish_date, 'YYYY-MM-DD') as publish_date, rating \
    FROM game JOIN studio ON game.studio_id = studio.id \
    WHERE studio.id = ANY($1)",
    [studioArr]
  );
  const { rows } = result;
  return rows;
}

async function gamesFilteredByGenre(genreArr) {
  const result = await pool.query(
    "SELECT game.id, title, TO_CHAR(publish_date, 'YYYY-MM-DD') as publish_date, rating \
  FROM game JOIN game_has_genre ghg ON ghg.game_id = game.id \
  JOIN genre ON ghg.genre_name = genre.name \
  WHERE genre.name = ANY($1)",
    [genreArr]
  );
  const { rows } = result;
  return rows;
}

async function gamesFilteredByGenreAndStudio(genreArr, studioArr) {
  const result = await pool.query(
    "SELECT game.id, title, TO_CHAR(publish_date, 'YYYY-MM-DD') as publish_date, rating \
  FROM game JOIN game_has_genre ghg ON ghg.game_id = game.id \
  JOIN genre ON ghg.genre_name = genre.name \
  JOIN studio ON game.studio_id = studio.id \
  WHERE genre.name = ANY($1) AND studio.id = ANY($2)",
    [genreArr, studioArr]
  );
  const { rows } = result;
  return rows;
}

async function getAllGames() {
  const result = await pool.query(
    "SELECT game.id, title, TO_CHAR(publish_date, 'YYYY-MM-DD') as publish_date, rating FROM game;"
  );
  const { rows } = result;
  return rows;
}

// calls the right query function depending on what query filtering arrays were supplied
async function getGamesList(genreArr, studioArr) {
  if (genreArr && studioArr) {
    return gamesFilteredByGenreAndStudio(genreArr, studioArr);
  } else if (genreArr) {
    return gamesFilteredByGenre(genreArr);
  } else if (studioArr) {
    return gamesFilteredByStudio(studioArr);
  } else {
    return getAllGames();
  }
}

async function getAllStudios() {
  const result = await pool.query("SELECT * FROM studio;");
  const { rows } = result;
  return rows;
}

async function getAllGenres() {
  const result = await pool.query("SELECT * FROM genre;");
  const { rows } = result;
  return rows;
}

async function insertGame(data) {
  console.log("logging data");
  console.log(data);
  await pool.query(
    "INSERT INTO game(title, publish_date, rating, studio_id) VALUES \
    ($1, $2, $3, $4)",
    [data.title, data.publish_date, data.rating, data.studio_id]
  );

  if (data.genre_name !== "") {
    const result = await pool.query(
      "SELECT id FROM game WHERE \
      title = $1",
      [data.title]
    );
    const { rows } = result;
    console.log(rows);
    await pool.query(
      "INSERT INTO game_has_genre(game_id, genre_name) VALUES \
      ($1, $2)",
      [rows[0].id, data.genre_name]
    );
  }
}

module.exports = {
  getGamesList,
  getAllStudios,
  getAllGenres,
  insertGame,
};
