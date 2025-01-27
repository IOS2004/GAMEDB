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
  FOREIGN KEY (game_id) REFERENCES games (game_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (category_name) REFERENCES category (name) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_game_category_game_id ON game_category (game_id);  
CREATE INDEX IF NOT EXISTS idx_game_category_category_name ON game_category (category_name); 

TRUNCATE TABLE developers, games, category, game_category RESTART IDENTITY CASCADE;
INSERT INTO developers (name, about) VALUES
('Nintendo', 'Founded in 1889 in Japan, Nintendo is a multinational video game company best known for creating iconic franchises such as Mario, The Legend of Zelda, and Pokémon. It has been instrumental in shaping the modern gaming industry.'),
('Ubisoft', 'A French video game company founded in 1986, Ubisoft is famous for developing critically acclaimed franchises like Assassin''s Creed, Far Cry, Watch Dogs, and Just Dance.'),
('Rockstar Games', 'An American video game developer established in 1998, known for its Grand Theft Auto series, Red Dead Redemption, and groundbreaking open-world experiences.'),
('Valve Corporation', 'Founded in 1996, Valve is best known for its Half-Life and Portal franchises, as well as the Steam platform, a leading digital distribution service.'),
('Electronic Arts (EA)', 'A global leader in video game publishing and development, EA is renowned for sports titles like FIFA and Madden, as well as franchises like Battlefield, The Sims, and Apex Legends.'),
('Square Enix', 'A Japanese video game developer and publisher known for its RPG series, including Final Fantasy, Dragon Quest, and Kingdom Hearts. The company was formed through the merger of Square and Enix in 2003.'),
('Activision', 'A prominent American video game publisher, Activision is best known for the Call of Duty franchise and other blockbuster hits such as Guitar Hero and Tony Hawk''s Pro Skater.'),
('Bethesda Game Studios', 'A division of Bethesda Softworks, this studio is celebrated for creating expansive RPGs like The Elder Scrolls and Fallout series.'),
('CD Projekt Red', 'A Polish game development studio renowned for The Witcher series and Cyberpunk 2077, with a strong focus on immersive storytelling and open-world design.'),
('Bungie', 'An American video game developer, originally the creators of Halo, now focused on Destiny, an expansive online multiplayer experience.'),
('Epic Games', 'Founded in 1991, Epic Games is known for the Unreal Engine, as well as the global sensation Fortnite and Gears of War.'),
('Capcom', 'A Japanese game developer behind iconic franchises like Resident Evil, Street Fighter, Monster Hunter, and Devil May Cry.'),
('Blizzard Entertainment', 'A division of Activision Blizzard, Blizzard is best known for Warcraft, StarCraft, Diablo, and Overwatch franchises.'),
('SEGA', 'A Japanese multinational company famous for Sonic the Hedgehog, Total War, and Yakuza series.'),
('Bandai Namco Entertainment', 'A major Japanese video game company behind franchises like Tekken, Pac-Man, and Dark Souls.'),
('FromSoftware', 'A Japanese studio best known for its challenging and atmospheric games like Dark Souls, Bloodborne, Sekiro, and Elden Ring.'),
('Konami', 'A Japanese game developer and publisher known for Metal Gear Solid, Castlevania, and Silent Hill series.'),
('Treyarch', 'An American game development studio, part of Activision, and best known for its contributions to the Call of Duty franchise, particularly the Black Ops series.'),
('Infinity Ward', 'Creators of the Call of Duty Modern Warfare series and a pioneer in first-person shooters.'),
('Naughty Dog', 'A Sony-owned studio responsible for acclaimed games like The Last of Us, Uncharted, and Jak and Daxter.'),
('Insomniac Games', 'A PlayStation partner studio famous for Ratchet & Clank, Spyro, and Marvel''s Spider-Man.'),
('Respawn Entertainment', 'The creators of Titanfall, Apex Legends, and Star Wars Jedi: Fallen Order, known for innovative gameplay mechanics.'),
('Obsidian Entertainment', 'Specializes in RPGs, with notable titles like Fallout: New Vegas, Pillars of Eternity, and The Outer Worlds.'),
('Riot Games', 'An American studio behind the global esports phenomenon League of Legends and tactical shooter Valorant.'),
('Mojang Studios', 'The Swedish developer behind Minecraft, one of the best-selling and most influential games of all time.'),
('Telltale Games', 'Known for narrative-driven adventure games like The Walking Dead, The Wolf Among Us, and Game of Thrones.'),
('Supercell', 'A Finnish mobile game developer behind Clash of Clans, Clash Royale, and Brawl Stars.'),
('BioWare', 'A Canadian game development studio, part of EA, famous for Mass Effect, Dragon Age, and Star Wars: Knights of the Old Republic.'),
('Crytek', 'A German video game developer known for its CryEngine technology and franchises like Far Cry and Crysis.'),
('Kojima Productions', 'Founded by Hideo Kojima, this Japanese studio is best known for Death Stranding and its cinematic approach to storytelling.'),
('PlatinumGames', 'A Japanese developer behind action-packed titles like Bayonetta, Nier: Automata, and Astral Chain.'),
('Paradox Interactive', 'A Swedish game publisher specializing in grand strategy games like Crusader Kings, Europa Universalis, and Stellaris.'),
('Team Cherry', 'An indie studio from Australia known for the critically acclaimed Metroidvania, Hollow Knight.'),
('Larian Studios', 'A Belgian studio behind the Divinity: Original Sin series and Baldur''s Gate 3, known for deep RPG mechanics.'),
('id Software', 'A pioneer in first-person shooters, id Software created Doom, Quake, and Wolfenstein franchises.'),
('Remedy Entertainment', 'A Finnish studio known for cinematic action games like Max Payne, Alan Wake, and Control.'),
('Playdead', 'A Danish indie developer known for its atmospheric puzzle-platformers Limbo and Inside.'),
('ZeniMax Online Studios', 'Developers of The Elder Scrolls Online, an MMO set in the Elder Scrolls universe.'),
('Media Molecule', 'A British studio best known for LittleBigPlanet, Tearaway, and Dreams, emphasizing user creativity.'),
('Hello Games', 'An indie studio behind No Man''s Sky, a massive procedural space exploration game.'),
('Bluepoint Games', 'Renowned for high-quality remakes like Demon''s Souls and Shadow of the Colossus.'),
('Monolith Soft', 'A Japanese studio responsible for Xenoblade Chronicles and a contributor to The Legend of Zelda: Breath of the Wild.'),
('Sucker Punch Productions', 'Developers of Ghost of Tsushima, Infamous, and Sly Cooper franchises.'),
('Gearbox Software', 'Known for the Borderlands series and contributions to Half-Life expansions.'),
('Rebellion Developments', 'A British studio behind Sniper Elite, Zombie Army, and Strange Brigade games.'),
('Traveller''s Tales', 'Developers of LEGO video games, including LEGO Star Wars, LEGO Harry Potter, and more.'),
('Creative Assembly', 'A British developer famous for the Total War strategy games and Alien: Isolation.'),
('Giant Sparrow', 'An indie studio behind What Remains of Edith Finch, known for innovative storytelling.'),
('Dontnod Entertainment', 'A French studio known for narrative games like Life is Strange and Vampyr.');

INSERT INTO games (name, synopsis, sysreq, release_date, developer_id) VALUES
-- Nintendo Games
('The Legend of Zelda: Breath of the Wild', 
'A sprawling open-world adventure where players take control of Link to defeat Calamity Ganon and save Hyrule.',
'Minimum: Intel Core i5-2400, 8GB RAM, NVIDIA GTX 660. Recommended: Intel Core i7-4770, 16GB RAM, GTX 1060.',
'2017-03-03', 1),
('Super Mario Odyssey', 
'Join Mario and his hat companion Cappy in a globetrotting 3D platforming adventure to rescue Princess Peach.',
'Minimum: Intel Core i3, 4GB RAM, NVIDIA GTX 660. Recommended: Intel Core i5, 8GB RAM, GTX 960.',
'2017-10-27', 1),
('Pokémon Scarlet and Violet', 
'The latest open-world Pokémon RPGs set in the Paldea region, introducing new mechanics and Pokémon species.',
'Minimum: Intel Core i3, 4GB RAM, Intel HD Graphics. Recommended: Intel Core i5, 8GB RAM, NVIDIA GTX 1050.',
'2022-11-18', 1),

-- Ubisoft Games
('Assassin''s Creed Valhalla', 
'An epic Viking saga where players explore a vast open-world England as Eivor, a Norse raider.',
'Minimum: Intel Core i5-4460, 8GB RAM, NVIDIA GTX 960. Recommended: Intel Core i7-8700K, 16GB RAM, GTX 1080.',
'2020-11-10', 2),
('Far Cry 6', 
'A revolutionary open-world FPS set in the fictional island of Yara, led by a dictator played by Giancarlo Esposito.',
'Minimum: AMD Ryzen 3, 8GB RAM, AMD RX 460. Recommended: AMD Ryzen 5, 16GB RAM, RX 5700.',
'2021-10-07', 2),
('Watch Dogs: Legion', 
'Control any NPC in a futuristic London fighting against an oppressive regime in this action-adventure game.',
'Minimum: Intel Core i5-4460, 8GB RAM, NVIDIA GTX 970. Recommended: Intel Core i7, 16GB RAM, RTX 2060.',
'2020-10-29', 2),

-- Rockstar Games
('Grand Theft Auto V', 
'An expansive open-world game where players follow the intertwined stories of three criminals in Los Santos.',
'Minimum: Intel Core i5-3470, 8GB RAM, NVIDIA GTX 660. Recommended: Intel Core i7, 16GB RAM, GTX 1080.',
'2013-09-17', 3),
('Red Dead Redemption 2', 
'A cinematic Western adventure following Arthur Morgan and the Van der Linde gang.',
'Minimum: Intel Core i5-2500K, 8GB RAM, NVIDIA GTX 770. Recommended: Intel Core i7-4770, 12GB RAM, GTX 1060.',
'2018-10-26', 3),

-- Valve Corporation Games
('Portal 2', 
'A physics-based puzzle game featuring witty dialogue and a robot companion, Wheatley.',
'Minimum: Intel Core 2 Duo, 2GB RAM, Intel Integrated Graphics. Recommended: Intel Core i5, 4GB RAM, NVIDIA GTX 460.',
'2011-04-19', 4),
('Half-Life: Alyx', 
'A VR exclusive that expands on the Half-Life universe with immersive first-person gameplay.',
'Minimum: Intel Core i5-7500, 12GB RAM, NVIDIA GTX 1060. Recommended: Intel Core i7, 16GB RAM, RTX 2070.',
'2020-03-23', 4),

-- Electronic Arts (EA) Games
('FIFA 23', 
'The latest entry in the FIFA series with HyperMotion technology for realistic animations.',
'Minimum: Intel Core i5-6600K, 8GB RAM, NVIDIA GTX 1050. Recommended: Intel Core i7-6700, 12GB RAM, GTX 1660.',
'2022-09-30', 5),
('Apex Legends', 
'A free-to-play battle royale game set in the Titanfall universe with unique characters and abilities.',
'Minimum: Intel Core i3-6300, 6GB RAM, NVIDIA GTX 640. Recommended: Intel Core i5, 8GB RAM, GTX 970.',
'2019-02-04', 5),

-- CD Projekt Red Games
('The Witcher 3: Wild Hunt', 
'Play as Geralt of Rivia, a monster hunter, in this open-world RPG known for its rich storytelling.',
'Minimum: Intel Core i5-2500K, 8GB RAM, NVIDIA GTX 660. Recommended: Intel Core i7-3770, 16GB RAM, GTX 970.',
'2015-05-19', 9),
('Cyberpunk 2077', 
'A futuristic RPG set in Night City, where players take on the role of V, a customizable mercenary.',
'Minimum: Intel Core i5-3570K, 8GB RAM, NVIDIA GTX 780. Recommended: Intel Core i7-4790, 16GB RAM, RTX 2060.',
'2020-12-10', 9),

-- Epic Games
('Fortnite', 
'A free-to-play battle royale and sandbox game with creative building mechanics.',
'Minimum: Intel Core i3-3225, 4GB RAM, Intel HD Graphics 4000. Recommended: Intel Core i5, 8GB RAM, GTX 660.',
'2017-07-21', 11),

-- FromSoftware Games
('Dark Souls III', 
'An action RPG known for its challenging combat and intricate world design.',
'Minimum: Intel Core i3-2100, 4GB RAM, NVIDIA GTX 750 Ti. Recommended: Intel Core i5, 8GB RAM, GTX 970.',
'2016-03-24', 16),
('Elden Ring', 
'A vast open-world fantasy RPG collaboration between Hidetaka Miyazaki and George R.R. Martin.',
'Minimum: Intel Core i5-8400, 12GB RAM, NVIDIA GTX 1060. Recommended: Intel Core i7-8700K, 16GB RAM, RTX 2060.',
'2022-02-25', 16),

-- Riot Games
('League of Legends', 
'A team-based MOBA where players control unique champions to destroy the enemy Nexus.',
'Minimum: Intel Core i3-530, 2GB RAM, Intel HD Graphics. Recommended: Intel Core i5, 4GB RAM, NVIDIA GTX 460.',
'2009-10-27', 24),
('Valorant', 
'A tactical FPS with unique agents and abilities, emphasizing precision shooting and teamwork.',
'Minimum: Intel Core 2 Duo, 4GB RAM, Intel HD Graphics 3000. Recommended: Intel Core i5, 8GB RAM, GTX 1050.',
'2020-06-02', 24),

-- Mojang Studios Games
('Minecraft', 
'A sandbox survival and creative game that allows players to build and explore infinite worlds.',
'Minimum: Intel Core i3-3210, 4GB RAM, Intel HD Graphics 4000. Recommended: Intel Core i5, 8GB RAM, GTX 1050.',
'2011-11-18', 25);
INSERT INTO games (name, synopsis, sysreq, release_date, developer_id) VALUES
-- Blizzard Entertainment Games
('World of Warcraft', 
'A massively multiplayer online role-playing game set in the world of Azeroth, where players can explore, fight, and craft alliances.',
'Minimum: Intel Core i5-3450, 4GB RAM, NVIDIA GTX 760. Recommended: Intel Core i7-4770, 8GB RAM, GTX 1060.',
'2004-11-23', 6),
('Overwatch 2', 
'A team-based FPS with diverse heroes, each with unique abilities and roles, in a push for victory.',
'Minimum: Intel Core i3, 4GB RAM, NVIDIA GTX 460. Recommended: Intel Core i7, 8GB RAM, GTX 970.',
'2022-10-04', 6),

-- Square Enix Games
('Final Fantasy XV', 
'A visually stunning RPG where Noctis and his companions journey to reclaim their kingdom.',
'Minimum: Intel Core i5-2500, 8GB RAM, NVIDIA GTX 760. Recommended: Intel Core i7-3770, 16GB RAM, GTX 1060.',
'2016-11-29', 7),
('Tomb Raider', 
'A reboot of the iconic franchise, following Lara Croft on her first survival adventure.',
'Minimum: Intel Core i3, 4GB RAM, NVIDIA GTX 560. Recommended: Intel Core i5, 8GB RAM, GTX 760.',
'2013-03-05', 7),

-- Bungie Games
('Destiny 2', 
'A multiplayer FPS blending elements of role-playing and an evolving sci-fi universe.',
'Minimum: Intel Core i3-3250, 6GB RAM, NVIDIA GTX 660. Recommended: Intel Core i5, 8GB RAM, GTX 970.',
'2017-09-06', 8),

-- Naughty Dog Games
('The Last of Us Part II', 
'A harrowing story of survival and revenge set in a post-apocalyptic world.',
'Minimum: Intel Core i5-2500K, 8GB RAM, NVIDIA GTX 1050. Recommended: Intel Core i7-6700, 16GB RAM, GTX 1660.',
'2020-06-19', 13),
('Uncharted 4: A Thief''s End', 
'Follow Nathan Drake on his last treasure-hunting adventure filled with action and intrigue.',
'Minimum: Intel Core i5-2500, 8GB RAM, NVIDIA GTX 760. Recommended: Intel Core i7, 12GB RAM, GTX 970.',
'2016-05-10', 13),

-- Bethesda Games
('The Elder Scrolls V: Skyrim', 
'A legendary RPG that allows players to explore the vast lands of Tamriel as the Dragonborn.',
'Minimum: Intel Core i3, 4GB RAM, NVIDIA GTX 260. Recommended: Intel Core i5, 8GB RAM, GTX 960.',
'2011-11-11', 10),
('Fallout 4', 
'A post-apocalyptic RPG where players survive and rebuild in the aftermath of nuclear devastation.',
'Minimum: Intel Core i5-2300, 8GB RAM, NVIDIA GTX 550 Ti. Recommended: Intel Core i7, 16GB RAM, GTX 970.',
'2015-11-10', 10),

-- Indie Games
('Hollow Knight', 
'A stunning hand-drawn Metroidvania adventure exploring the ruined kingdom of Hallownest.',
'Minimum: Intel Core 2 Duo, 4GB RAM, NVIDIA GTX 560. Recommended: Intel Core i5, 8GB RAM, GTX 960.',
'2017-02-24', 26),
('Stardew Valley', 
'A relaxing farming simulator where players build their farm, form relationships, and explore caves.',
'Minimum: Intel Core 2 Duo, 2GB RAM, Intel Integrated Graphics. Recommended: Intel Core i5, 4GB RAM, NVIDIA GTX 460.',
'2016-02-26', 26),
('Celeste', 
'A precision platformer following Madeline as she climbs a mysterious mountain, battling inner demons.',
'Minimum: Intel Core i3, 4GB RAM, NVIDIA GTX 760. Recommended: Intel Core i5, 8GB RAM, GTX 970.',
'2018-01-25', 26),

-- Activision Games
('Call of Duty: Modern Warfare II', 
'A high-octane FPS with cinematic campaign missions and engaging multiplayer modes.',
'Minimum: Intel Core i3-6100, 8GB RAM, NVIDIA GTX 960. Recommended: Intel Core i7, 16GB RAM, RTX 2060.',
'2022-10-28', 14),
('Sekiro: Shadows Die Twice', 
'A samurai action-adventure game focusing on stealth and punishing sword combat.',
'Minimum: Intel Core i3, 4GB RAM, NVIDIA GTX 760. Recommended: Intel Core i7, 8GB RAM, GTX 970.',
'2019-03-22', 14),

-- Paradox Interactive Games
('Cities: Skylines', 
'A city-building simulator that lets players design and manage complex urban ecosystems.',
'Minimum: Intel Core i3, 4GB RAM, Intel HD Graphics. Recommended: Intel Core i5, 8GB RAM, NVIDIA GTX 760.',
'2015-03-10', 28),
('Crusader Kings III', 
'A grand strategy game focusing on medieval dynasties, diplomacy, and warfare.',
'Minimum: Intel Core i3, 8GB RAM, NVIDIA GTX 660. Recommended: Intel Core i7, 16GB RAM, GTX 970.',
'2020-09-01', 28),

-- Capcom Games
('Resident Evil 4 Remake', 
'A remastered survival horror classic with updated graphics and gameplay mechanics.',
'Minimum: Intel Core i5, 8GB RAM, NVIDIA GTX 1050 Ti. Recommended: Intel Core i7, 16GB RAM, GTX 1660.',
'2023-03-24', 15),
('Monster Hunter: World', 
'A cooperative action RPG where players hunt and slay massive creatures in lush environments.',
'Minimum: Intel Core i5-4460, 8GB RAM, NVIDIA GTX 760. Recommended: Intel Core i7, 16GB RAM, GTX 1060.',
'2018-01-26', 15),

-- Bandai Namco Games
('Elden Ring', 
'An expansive open-world fantasy RPG with intricate lore and punishing combat.',
'Minimum: Intel Core i5, 12GB RAM, NVIDIA GTX 1060. Recommended: Intel Core i7, 16GB RAM, RTX 2060.',
'2022-02-25', 16),
('Dark Souls II', 
'A sequel to the legendary Dark Souls, continuing the tradition of challenging gameplay.',
'Minimum: Intel Core i3, 4GB RAM, NVIDIA GTX 750 Ti. Recommended: Intel Core i5, 8GB RAM, GTX 960.',
'2014-03-11', 16);


INSERT INTO category (name) VALUES
('Action'),
('Adventure'),
('Role-Playing'),
('Simulation'),
('Strategy'),
('Sports'),
('Shooter'),
('Fighting'),
('Horror'),
('Puzzle'),
('Platformer'),
('Stealth'),
('Survival'),
('Sandbox'),
('MMORPG'),
('MOBA'),
('Card Game'),
('Turn-Based Strategy'),
('Real-Time Strategy'),
('Open World'),
('Hack and Slash'),
('Roguelike'),
('Roguelite'),
('Idle Game'),
('Tycoon'),
('City Builder'),
('Visual Novel'),
('Battle Royale'),
('Narrative-Driven'),
('Rhythm'),
('Party Game'),
('Metroidvania'),
('First-Person Shooter'),
('Third-Person Shooter'),
('Top-Down Shooter'),
('Tactical'),
('Sci-Fi'),
('Fantasy'),
('Historical'),
('Post-Apocalyptic'),
('Anime'),
('Casual'),
('Cooperative'),
('Multiplayer Online'),
('Single Player'),
('eSports'),
('Virtual Reality'),
('Arcade'),
('Educational'),
('Trivia');

INSERT INTO game_category (game_id, category_name) VALUES
-- Blizzard Entertainment Games
(1, 'MMORPG'),
(1, 'Fantasy'),
(2, 'Shooter'),
(2, 'Multiplayer Online'),

-- Square Enix Games
(3, 'Role-Playing'),
(3, 'Fantasy'),
(4, 'Action'),
(4, 'Adventure'),

-- Bungie Games
(5, 'Shooter'),
(5, 'Sci-Fi'),
(5, 'Multiplayer Online'),

-- Naughty Dog Games
(6, 'Action'),
(6, 'Adventure'),
(6, 'Narrative-Driven'),
(7, 'Action'),
(7, 'Adventure'),

-- Bethesda Games
(8, 'Role-Playing'),
(8, 'Fantasy'),
(8, 'Open World'),
(9, 'Role-Playing'),
(9, 'Post-Apocalyptic'),
(9, 'Open World'),

-- Indie Games
(10, 'Platformer'),
(10, 'Metroidvania'),
(11, 'Simulation'),
(11, 'Casual'),
(12, 'Platformer'),
(12, 'Narrative-Driven'),

-- Activision Games
(13, 'Shooter'),
(13, 'Multiplayer Online'),
(14, 'Action'),
(14, 'Adventure'),

-- Paradox Interactive Games
(15, 'City Builder'),
(15, 'Simulation'),
(16, 'Strategy'),
(16, 'Historical'),
(16, 'Tactical'),

-- Capcom Games
(17, 'Horror'),
(17, 'Survival'),
(18, 'Role-Playing'),
(18, 'Action'),
(18, 'Cooperative'),

-- Bandai Namco Games
(19, 'Role-Playing'),
(19, 'Fantasy'),
(19, 'Open World'),
(20, 'Action'),
(20, 'Fantasy'),
(20, 'Roguelike'),

-- Additional associations for more variety
(1, 'Open World'),
(3, 'Narrative-Driven'),
(3, 'Hack and Slash'),
(6, 'Survival'),
(6, 'Horror'),
(7, 'Narrative-Driven'),
(9, 'Sandbox'),
(10, 'Fantasy'),
(10, 'Puzzle'),
(12, 'Puzzle'),
(13, 'eSports'),
(14, 'Fantasy'),
(14, 'Roguelike'),
(15, 'Tycoon'),
(18, 'Hack and Slash'),
(19, 'Multiplayer Online');
`;

module.exports = SQL;