const pool = require("./pool");

async function gamesFilteredByStudio(studioArr) {
  const result = await pool.query(
    "SELECT game.id, title, TO_CHAR(publish_date, 'YYYY-MM-DD') as publish_date, rating \
    FROM game JOIN studio ON game.studio_id = studio.id \
    WHERE studio.name = ANY($1)",
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
  WHERE genre.name = ANY($1) AND studio.name = ANY($2)",
    [genreArr, studioArr]
  );
  const { rows } = result;
  return rows;
}

async function getGamesList(genreArr = null, studioArr = null) {
  if (genreArr !== null && studioArr !== null) {
    return gamesFilteredByGenreAndStudio(genreArr, studioArr);
  }
  if (genreArr !== null) {
    return gamesFilteredByGenre(genreArr);
  }
  if (studioArr !== null) {
    return gamesFilteredByStudio(studioArr);
  }

  const result = pool.query(
    "SELECT id, title, TO_CHAR(publish_date, 'YYYY-MM-DD') as publish_date, rating FROM game"
  );
  const { rows } = result;
  return rows;
}

async function getAllStudios() {
  const result = await pool.query("SELECT * FROM studio");
  const { rows } = result;
  return rows;
}

module.exports = {
  getGamesList,
  getAllStudios,
};
