const pool = require("./pool");

async function getAllGames() {
  const result = await pool.query("SELECT * FROM game");
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
