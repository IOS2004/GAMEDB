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
  if (rows.length === 0)
    return null;
  return rows[0];
}

async function getDeveloperByIdQ(developer_id) {
  const {rows} = await pool.query('SELECT * FROM developers WHERE developer_id = $1', [developer_id]);
  if (rows.length === 0)
    return null;
  return rows[0];
}

async function getCategoriesFromGameQ(game_id) {
  const {rows} = await pool.query('SELECT * FROM category WHERE name IN (SELECT category_name FROM game_category WHERE game_id = $1)', [game_id]);
  return rows;
}

async function createCategoryQ(category_name) {
  await pool.query('INSERT INTO category (name) VALUES ($1)', [category_name]);
}


async function deleteCategoryQ(name)
{
  await pool.query('DELETE FROM category WHERE name = $1', [name])
}

async function updateCategoryQ(original_name, new_name)
{
  await pool.query('UPDATE category SET name = $1 WHERE name = $2', [new_name, original_name]);
}

async function insertGameOnCategoryQ(game_id, category_name)
{
  await pool.query('INSERT INTO game_category (game_id, category_name) VALUES ($1, $2)', [game_id, category_name])

}

async function createGameQ(name, synopsis, sysreq, release_date, developer_id)
{ 
  await pool.query('INSERT INTO games (name, synopsis, sysreq, release_date, developer_id) VALUES ($1, $2, $3, $4, $5)', [name, synopsis, sysreq, release_date, developer_id])

}

async function updateGameQ(name, synopsis, sysreq, release_date, developer_id, game_id)
{
  await pool.query(
    'UPDATE games SET name = $1, synopsis = $2, sysreq = $3, release_date = $4, developer_id = $5 WHERE game_id = $6',
    [name, synopsis, sysreq, release_date, developer_id, game_id]
  );
}

async function deleteGameQ(game_id)
{
  await pool.query('DELETE FROM games WHERE game_id = $1', [game_id])
}

async function createDeveloperQ(name, about) {
  await pool.query('INSERT INTO developers (name, about) VALUES ($1, $2)', [name, about])
}

async function updateDeveloperQ(name, about, developer_id)
{
  await pool.query('UPDATE developers SET name = $1, about = $2 WHERE developer_id = $3', [name, about, developer_id])
}

async function deleteDeveloperQ(developer_id)
{
  await pool.query('DELETE FROM developers WHERE developer_id = $1', [developer_id])
}


module.exports = {
  getCategoriesQ,
  getGamesQ,
  getDevelopersQ,
  getGamesFromCategoryQ,
  getDeveloperByIdQ,
  getGameByIdQ,
  getGamesFromDeveloperQ,
  getCategoriesFromGameQ,
  createCategoryQ,
  updateCategoryQ,
  deleteCategoryQ,
  insertGameOnCategoryQ,
  createGameQ,
  updateGameQ,
  deleteGameQ,
  createDeveloperQ,
  updateDeveloperQ,
  deleteDeveloperQ
}