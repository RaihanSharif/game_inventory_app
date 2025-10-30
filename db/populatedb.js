#! /usr/bin/env node

const { Client } = require("pg");
const { argv } = require("node:process");

const SQL = `Create TABLE IF NOT EXISTS game (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR (255)
  );
  
  INSERT INTO usernames (username)
  VALUES
    ('Bryan'),
    ('Odin'),
    ('Damon');
    `;

async function main(connectStr) {
  console.log("seeding...");
  const client = new Client({
    connectionString: connectStr, // /postgresql://raihansharif@localhost:5432/top_users for local host
  });
  console.log(argv[2]);
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main(argv[2]);
