const pool = require("./pool");

async function getAllGames() {
  const result = await pool.query(
    "SELECT title, (publish_date, 'YYYY-DD-MM') as publish_date, rating FROM game \
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
  getAllStudios,
};
