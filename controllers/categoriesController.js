const db = require('../db/queries');
const { query, body, validationResult } = require("express-validator");
const asyncHandler = require('express-async-handler');

const validateCategory = [
  body("category_name").trim().isAlpha().withMessage("Category must only contain letters")
  .custom(async (value) => {
    let categories = await db.getCategoriesQ();
    categories = categories.map((category) => category.name.toLowerCase())
    if (categories.includes(value.toLowerCase()))
      throw new Error("Category already exists")
    return true;
  }).customSanitizer((value) => (value.charAt(0).toUpperCase() + value.slice(1))),
]

const validateGameId = [
  body("game_id").trim().isInt().withMessage("Game ID is an integer").custom(async (value, {req}) => {
    let games = await db.getGamesQ();
    games = games.map((game) => game.game_id);
    if (games.includes(Number(value)))
    {
      let catgame = await db.getGamesFromCategoryQ(req.params.name);
      catgame = catgame.map((game) => game.game_id);
      if (catgame.includes(Number(value)))
        throw new Error("Game with given ID is already present");
      return true;
    }
    throw new Error("Game with given ID does not exists");
  })
]

async function getCategories(req, res) {
  const categories = await db.getCategoriesQ();
  res.render('categories', {categories: categories});
}

async function getGamesFromCategory(req, res) {
  const name = req.params.name;
  const games = await db.getGamesFromCategoryQ(name);
  res.render('category', {games : games, category_name : name});
}

createCategory = [ 
  validateCategory,
  asyncHandler(
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
      const categories = await db.getCategoriesQ();
      res.status(400).render('categories', {categories: categories, errors: errors.array()});    
    }
    const name = req.body.category_name;
    await db.createCategoryQ(name);
    res.redirect('/categories');
  })
]

updateCategory = [
  validateCategory,
  asyncHandler(
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
      {
        const name = req.params.name;
        const games = await db.getGamesFromCategoryQ(name);
        res.status(400).render('category', {games : games, category_name : name, errors: errors.array()});
        return;
      }
      const name = req.body.category_name;
      const original = req.params.name
      await db.updateCategoryQ(original, name);
      res.redirect(`/categories/${name}`);
    }
  )
]

deleteCategory = [
  asyncHandler(
    async (req, res) => {
      const name = req.params.name;
      await db.deleteCategoryQ(name);
      res.redirect('/categories');
    }
  )
]

addGameOnCategory = [
  validateGameId,
  asyncHandler(
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
      {
        const name = req.params.name;
        const games = await db.getGamesFromCategoryQ(name);
        res.status(400).render('category', {games : games, category_name : name, errors: errors.array()});
        return;
      }
      const name = req.params.name;
      const game_id = req.body.game_id;
      await db.insertGameOnCategoryQ(game_id, name);
      res.redirect(`/categories/${name}`);
    }
  )
]

getCategories = asyncHandler(getCategories)
getGamesFromCategory = asyncHandler(getGamesFromCategory)

module.exports = {
  getCategories,
  getGamesFromCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  addGameOnCategory
}