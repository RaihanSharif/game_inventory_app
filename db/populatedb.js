#! /usr/bin/env node

const { Client } = require("pg");
const { argv } = require("node:process");

const SQL = `CREATE TYPE age_rating AS ENUM(3, 7, 12, 16, 18);

  CREATE TABLE IF NOT EXISTS game (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR (255),
    publish_date,
    rating age_rating,
    studio_id INTEGER
  );

  create TABLE IF NOT EXISTS studio (
    id INTEGER GENERATED ALWAYS AS IDENTITY,
    name varchar (100),
    headquarters varchar(100),
    website varchar(250)
  );

  CREATE TABLE IF NOT EXISTS genre(
    name varchar(50) PRIMARY KEY;
  );

  CREATE TABLE game_has_genre(
    game_id INTEGER,
    genre_name VARCHAR(50),
    PRIMARY KEY(game_id, genre_name)
  );

  ALTER TABLE game ADD FOREIGN KEY(studio_id) REFERENCES studio(id)
  ON DELETE SET NULL ON UPDATE CASCADE;

  ALTER TABLE game_has_genre ADD FOREIGN KEY(game_id) REFERENCES game(id)
  ON DELETE CASCADE;
  ALTER TABLE game_has_genre ADD FOREIGN KEY(genre_name) REFERENCES genre(name)
  ON UPDATE CASCADE;
  
  INSERT INTO studio(name, headquarters, website) VALUES 
    ('CD Projekt Red', 'Warsaw, Poland', 'cdprojekt.com'),
    ('Valve Corporation', 'Kirkland, Washington', 'valvesoftware.com'),
    ('Ensamble Studios', 'Dallas, Texas'),
    ('Mojang Studios, 'Stockholm, Sweden', 'minecraft.net/en-us/article/meet-mojang-studios'),
    ('Infinity Ward', 'Los Angeles, California', 'infinityward.com'),
    ('Paradox Development Studio', 'Stockholm, Sweden', 'paradoxinteractive.com'),
    ('EA Vancouver','Vancouver, Canada'),
    ('Colossal Order', 'Tampere, Finland', 'colossalorder.fi')
    ('Slavic Magic', 'Poland', 'manorlords.com');

  INSERT INTO genre(name) VALUES 
    ('First Person Shooter'),
    ('Role Playing Game'),
    ('MOBA'),
    ('Crafting'),
    ('Grand Strategy'),
    ('Strategy'),
    ('Open World'),
    ('Real Time Strategy),
    ('City Builder'),
    ('Sport'),
    ('Crafting');
  
  INSERT INTO game (title, publish_date)
  VALUES
   1 ('The Witcher 3: Wild Hunt', '2015-05-18', 18, 1),
   2 ('Dota 2', '2013-07-09', 12, 2),
   3 ('Age of Empires', '2015-05-18', 12, 3),
   4 ('Minecraft', '2011-11-18', 7, 4),
   5 ('Call of Duty 4: Modern Warfare', '2007-11-05', 16, 5),
   6 ('Counter-Strike 2', '2023-09-27', 16, 2),
   7 ('Europa Universalis IV', '2013-08-13', 12, 6),
   8 ('Stellaris', '2015-05-18', 12, 6),
   9 ('FIFA 20', '2019-05-22', 12, 7),
   10 ('Cities Skylines', '2014-03-02', 12, 8),
   11 ('Manor Lords, ', '2024-04-26', 12, 9);
  
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
    (11, 'Strategy'),

    `;

async function main(connectStr) {
  console.log("seeding...");
  const client = new Client({
    connectionString: connectStr,
  });
  console.log(argv[2]);
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main(argv[2]);
