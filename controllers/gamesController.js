const db = require('../db/queries');

async function getGames(req, res) {
  const games = await db.getGamesQ();
  res.render('games', {games : games});
}

async function getGameById(req, res) {
  const game_id = req.params.game_id;
  const game = await db.getGameByIdQ(game_id);
  const developer = await db.getDeveloperByIdQ(game.developer_id);
  const categories = await db.getCategoriesFromGameQ(game_id);
  res.render('game', {game : game, developer : developer, categories : categories});
}

module.exports = {
  getGames,
  getGameById
}