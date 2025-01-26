const pool = require('./pool')

async function getCategoriesQ()
{
  const {rows} = await pool.query('SELECT * FROM category ORDER BY name');
  return rows;
}

async function getGamesQ()
{
  const {rows} = await pool.query('SELECT * FROM games ORDER BY name');
  return rows;
}

async function getDevelopersQ()
{
  const {rows} = await pool.query('SELECT * FROM developers ORDER BY name');
  return rows;
}

async function getGamesFromCategoryQ(category_name) {
  const {rows} = await pool.query('SELECT * FROM games WHERE game_id IN (SELECT game_id FROM game_category WHERE category_name = $1)', [category_name]);
  return rows;
}

async function getGamesFromDeveloperQ(developer_id) {
  const {rows} = await pool.query('SELECT * FROM games WHERE developer_id = $1', [developer_id]);
  return rows;
}

async function getGameByIdQ(game_id) {
  const {rows} = await pool.query('SELECT * FROM games WHERE game_id = $1', [game_id]);
  return rows[0];
}

async function getDeveloperByIdQ(developer_id) {
  const {rows} = await pool.query('SELECT * FROM developers WHERE developer_id = $1', [developer_id]);
  return rows[0];
}

async function getCategoriesFromGameQ(game_id) {
  const {rows} = await pool.query('SELECT * FROM category WHERE name IN (SELECT category_name FROM game_category WHERE game_id = $1)', [game_id]);
  return rows;
}

module.exports = {
  getCategoriesQ,
  getGamesQ,
  getDevelopersQ,
  getGamesFromCategoryQ,
  getDeveloperByIdQ,
  getGameByIdQ,
  getGamesFromDeveloperQ,
  getCategoriesFromGameQ
}