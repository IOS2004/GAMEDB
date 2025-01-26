#! /usr/bin/env node
const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS developers (
  developer_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (255) NOT NULL,
  about TEXT
);

CREATE INDEX IF NOT EXISTS idx_developers_name ON developers (name);  

CREATE TABLE IF NOT EXISTS games (
  game_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ) NOT NULL,
  synopsis TEXT NOT NULL, 
  sysreq TEXT NOT NULL,
  release_date DATE NOT NULL,
  developer_id INTEGER NOT NULL,
  FOREIGN KEY (developer_id) REFERENCES developers (developer_id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_games_developer_id ON games (developer_id);  
CREATE INDEX IF NOT EXISTS idx_games_name ON games (name);  
CREATE INDEX IF NOT EXISTS idx_games_synopsis_search ON games USING GIN (to_tsvector('english', synopsis));  

CREATE TABLE IF NOT EXISTS category (
  name VARCHAR (255) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS game_category (
  game_id INTEGER NOT NULL, 
  category_name VARCHAR (255) NOT NULL,
  PRIMARY KEY (game_id, category_name), 
  FOREIGN KEY (game_id) REFERENCES games (game_id) ON DELETE CASCADE,
  FOREIGN KEY (category_name) REFERENCES category (name) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_game_category_game_id ON game_category (game_id);  
CREATE INDEX IF NOT EXISTS idx_game_category_category_name ON game_category (category_name); 

TRUNCATE TABLE developers, games, category, game_category RESTART IDENTITY CASCADE;

INSERT INTO developers (name, about) VALUES 
('Naughty Dog', 'Famous for cinematic storytelling and action-adventure games.'),
('Valve Corporation', 'Creators of the Steam platform and groundbreaking games.'),
('CD Projekt Red', 'Developers of RPG classics like The Witcher and Cyberpunk.'),
('Rockstar Games', 'Known for the Grand Theft Auto and Red Dead Redemption series.'),
('Ubisoft', 'One of the largest video game publishers globally.'),
('Bethesda Game Studios', 'Makers of The Elder Scrolls and Fallout series.'),
('Square Enix', 'Renowned for Final Fantasy and Kingdom Hearts.'),
('Epic Games', 'Creators of Fortnite and Unreal Engine.'),
('FromSoftware', 'Pioneers of challenging games like Dark Souls and Elden Ring.'),
('Blizzard Entertainment', 'Known for iconic games like World of Warcraft and Overwatch.');

INSERT INTO games (name, synopsis, sysreq, release_date, developer_id) VALUES
('The Last of Us', 'Survive in a post-apocalyptic world filled with danger.', 'Intel i5, 8GB RAM, GTX 960', '2013-06-14', 1),
('Uncharted 4', 'An adventurous journey across lost cities and treasures.', 'Intel i7, 16GB RAM, GTX 1060', '2016-05-10', 1),
('Half-Life 2', 'A revolutionary FPS game combining physics and storytelling.', 'Intel i3, 4GB RAM, GTX 560', '2004-11-16', 2),
('Portal 2', 'A mind-bending puzzle game involving portals and physics.', 'Intel i5, 8GB RAM, GTX 760', '2011-04-18', 2),
('The Witcher 3', 'A vast open-world RPG featuring monster hunting and storytelling.', 'Intel i7, 16GB RAM, GTX 970', '2015-05-19', 3),
('Cyberpunk 2077', 'Explore a dystopian futuristic city as a mercenary.', 'Intel i7, 16GB RAM, RTX 2060', '2020-12-10', 3),
('GTA V', 'An open-world crime saga in the fictional city of Los Santos.', 'Intel i5, 8GB RAM, GTX 660', '2013-09-17', 4),
('Red Dead Redemption 2', 'An epic tale of life in America’s unforgiving heartland.', 'Intel i7, 12GB RAM, GTX 1060', '2018-10-26', 4),
('Assassin’s Creed Valhalla', 'A Viking epic set in 9th century England.', 'Intel i7, 16GB RAM, GTX 1080', '2020-11-10', 5),
('Far Cry 6', 'A battle against a dictator in a tropical paradise.', 'Intel i5, 8GB RAM, GTX 970', '2021-10-07', 5);

INSERT INTO category (name) VALUES 
('Action'), 
('Adventure'), 
('RPG'), 
('Shooter'), 
('Puzzle'), 
('Open-World'), 
('Post-Apocalyptic'), 
('Fantasy'), 
('Sci-Fi'), 
('Historical');

INSERT INTO game_category (game_id, category_name) VALUES
(1, 'Action'), 
(1, 'Adventure'), 
(1, 'Post-Apocalyptic'),
(2, 'Action'), 
(2, 'Adventure'),
(3, 'Shooter'), 
(3, 'Sci-Fi'),
(4, 'Puzzle'), 
(4, 'Sci-Fi'),
(5, 'RPG'), 
(5, 'Fantasy'), 
(6, 'RPG'), 
(6, 'Sci-Fi'), 
(7, 'Action'), 
(7, 'Open-World'), 
(8, 'Action'), 
(8, 'Adventure'), 
(8, 'Open-World'),
(9, 'Action'), 
(9, 'Adventure'), 
(9, 'Historical'),
(10, 'Action'), 
(10, 'Adventure'), 
(10, 'Open-World');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DB_URI,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();