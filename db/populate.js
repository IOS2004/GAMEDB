#! /usr/bin/env node
const { Client } = require("pg");
require("dotenv").config();
const SQL = require('./data')

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DB_URI,
    ssl: {
      rejectUnauthorized: false, 
    }
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();