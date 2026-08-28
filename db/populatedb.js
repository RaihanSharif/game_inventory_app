const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS studio (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  headquarters VARCHAR(255),
  website VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS genre (
  name VARCHAR(255) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS game (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR(255) NOT NULL UNIQUE,
  publish_date DATE,
  rating INT CHECK(rating IN (3, 7, 12, 16, 18)),
  studio_id INT REFERENCES studio(id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS game_has_genre (
  game_id INT REFERENCES game(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

  genre_name VARCHAR(255) REFERENCES genre(name)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

  PRIMARY KEY(game_id, genre_name)
);

INSERT INTO studio(name, headquarters, website) VALUES 
  ('CD Projekt Red', 'Warsaw, Poland', 'cdprojekt.com'),
  ('Valve Corporation', 'Kirkland, Washington', 'valvesoftware.com'),
  ('Ensamble Studios', 'Dallas, Texas', NULL),
  ('Mojang Studios', 'Stockholm, Sweden', 'minecraft.net/en-us/article/meet-mojang-studios'),
  ('Infinity Ward', 'Los Angeles, California', 'infinityward.com'),
  ('Paradox Development Studio', 'Stockholm, Sweden', 'paradoxinteractive.com'),
  ('EA Vancouver', 'Vancouver, Canada', NULL),
  ('Colossal Order', 'Tampere, Finland', 'colossalorder.fi'),
  ('Slavic Magic', 'Poland', 'manorlords.com')
ON CONFLICT (name) DO NOTHING;

INSERT INTO genre(name) VALUES 
  ('First Person Shooter'),
  ('Role Playing Game'),
  ('MOBA'),
  ('Crafting'),
  ('Grand Strategy'),
  ('Strategy'),
  ('Open World'),
  ('Real Time Strategy'),
  ('City Builder'),
  ('Sport')
ON CONFLICT (name) DO NOTHING;

INSERT INTO game (title, publish_date, rating, studio_id)
VALUES
  ('The Witcher 3: Wild Hunt', '2015-05-18', 18, 1),
  ('Dota 2', '2013-07-09', 12, 2),
  ('Age of Empires', '2015-05-18', 12, 3),
  ('Minecraft', '2011-11-18', 7, 4),
  ('Call of Duty 4: Modern Warfare', '2007-11-05', 16, 5),
  ('Counter-Strike 2', '2023-09-27', 16, 2),
  ('Europa Universalis IV', '2013-08-13', 12, 6),
  ('Stellaris', '2015-05-18', 12, 6),
  ('FIFA 20', '2019-05-22', 12, 7),
  ('Cities Skylines', '2014-03-02', 12, 8),
  ('Manor Lords', '2024-04-26', 12, 9)
ON CONFLICT (title) DO NOTHING;

INSERT INTO game_has_genre(game_id, genre_name) VALUES 
  (1, 'Role Playing Game'),
  (1, 'Open World'),
  (2, 'MOBA'),
  (3, 'Real Time Strategy'),
  (3, 'Strategy'),
  (4, 'Crafting'),
  (5, 'First Person Shooter'),
  (6, 'First Person Shooter'),
  (7, 'Grand Strategy'),
  (7, 'Strategy'),
  (8, 'Grand Strategy'),
  (8, 'Strategy'),
  (9, 'Sport'),
  (10, 'City Builder'),
  (11, 'City Builder'),
  (11, 'Strategy')
ON CONFLICT (game_id, genre_name) DO NOTHING;
`;

async function main() {
    console.log("seeding...");

    const client = new Client({
        connectionString: process.env.PGDATABASE,
    });

    try {
        await client.connect();

        const result = await client.query(`
      SELECT
        current_database(),
        current_user,
        current_schema()
    `);

        console.log(result.rows[0]);

        await client.query(SQL);

        console.log("Database seeded successfully.");
    } catch (err) {
        console.error("Seeding failed:");
        console.error(err.message);
        console.error(err.stack);
        process.exitCode = 1;
    } finally {
        await client.end();
    }
}

main();
