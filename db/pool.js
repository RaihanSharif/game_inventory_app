const { Pool } = require("pg");

module.exports = new Pool({
  connectionString: process.env.PGDATABASE,
  ssl: {
    rejectUnauthorized: false,
  },
});
