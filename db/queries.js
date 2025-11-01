const pool = require("./pool");

async function gamesFilteredByStudio(studioArr) {
  const result = await pool.query(
    "SELECT title, TO_CHAR(publish_date, 'YYYY-MM-DD') as publish_date, rating \
    FROM game JOIN studio ON game.studio_id = studio.id \
    WHERE studio.name = ANY($1)",
    [studioArr]
  );
  const { rows } = result;
  return rows;
}

async function getAllGames() {
  const result = await pool.query(
    "SELECT title, TO_CHAR(publish_date, 'YYYY-MM-DD') as publish_date, rating FROM game \
    WHERE title IN ('Dota 2', 'Minecraft')"
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
  getAllGames,
  gamesFilteredByStudio,
  getAllStudios,
};
