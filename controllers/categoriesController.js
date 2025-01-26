const db = require('../db/queries');

async function getCategories(req, res) {
  const categories = await db.getCategoriesQ();
  res.render('categories', {categories: categories});
}

async function getGamesFromCategory(req, res) {
  const name = req.params.name;
  const games = await db.getGamesFromCategoryQ(name);
  res.render('category', {games : games, category_name : name});
}

module.exports = {
  getCategories,
  getGamesFromCategory
}