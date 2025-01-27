const db = require('../db/queries');
const { query, body, validationResult } = require("express-validator");
const asyncHandler = require('express-async-handler');

const textLength = "must be between 5 to 1000 characters long";

const validateGame = [
  body("game_name").trim().isLength({min : 3, max : 30}).withMessage('Game name must be between 3 to 30 characters long'),
  body("synopsis").trim().isLength({min : 5, max : 1000}).withMessage( `Synopsis ${textLength}`),
  body("sysreq").trim().isLength({min : 5, max : 1000}).withMessage( `System requirements ${textLength}`),
  body("release_date"),
  body("developer_id").isInt().withMessage("Developer ID must be a integer").custom(async (value) => {
    const dev = await db.getDeveloperByIdQ(Number(value));
    if (!dev) {
      throw new Error("Given developer ID does not exist");
    }
    return true;
  })
]

const validateGameForUpdate = [
  body("game_name").optional({values : 'falsy'}).trim().isLength({min : 3, max : 30}).withMessage('Game name must be between 3 to 30 characters long'),
  body("synopsis").optional({values : 'falsy'}).trim().isLength({min : 5, max : 1000}).withMessage( `Synopsis ${textLength}`),
  body("sysreq").optional({values : 'falsy'}).trim().isLength({min : 5, max : 1000}).withMessage( `System requirements ${textLength}`),
  body("release_date").optional({values : 'falsy'}),
  body("developer_id").optional({values : 'falsy'}).isInt().withMessage("Developer ID must be a integer").custom(async (value) => {
    const dev = await db.getDeveloperByIdQ(Number(value));
    if (!dev) {
      throw new Error("Given developer ID does not exist");
    }
    return true;
  }),
  body().custom((_, {req}) => {
    if (!req.body.game_name && !req.body.synopsis && !req.body.sysreq && !req.body.release_date && !req.body.developer_id)
    {
      throw new Error("At least one field must be filled");
    }
    return true;
  })
]

const validateCategory = [
  body("category_name").trim().isAlpha().withMessage("Category must only contain letters")
  .custom(async (value) => {
    let categories = await db.getCategoriesQ();
    categories = categories.map((category) => category.name.toLowerCase())
    if (!categories.includes(value.toLowerCase()))
      throw new Error("Category does not exist")
    return true;
  }).customSanitizer((value) => (value.charAt(0).toUpperCase() + value.slice(1))),
]

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

createGame = [
  validateGame,
  asyncHandler(
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
      const games = await db.getGamesQ();
      res.status(400).render('games', {games : games, errors : errors.array()});
      return;
    }
    await db.createGameQ(req.body.game_name, req.body.synopsis, req.body.sysreq, req.body.release_date, req.body.developer_id, req.params.game_id);
    res.redirect('/games');
  })
]

updateGame = [
  validateGameForUpdate,
  asyncHandler(
  async (req, res) => {
    const errors = validationResult(req);
    const game_id = req.params.game_id;
    const game = await db.getGameByIdQ(game_id);
    if (!errors.isEmpty())
    {
      const developer = await db.getDeveloperByIdQ(game.developer_id);
      const categories = await db.getCategoriesFromGameQ(game_id);
      res.status(400).render('game', {game : game, developer : developer, categories : categories, errors : errors.array()});
      return;
    }
    const game_name = (req.body.game_name) ? req.body.game_name : game.name;
    const synopsis = (req.body.synopsis) ? req.body.synopsis : game.synopsis;
    const sysreq = (req.body.sysreq) ? req.body.sysreq : game.sysreq;
    const release_date = (req.body.release_date) ? req.body.release_date : game.release_date;
    const developer_id = (req.body.developer_id) ? req.body.developer_id : game.developer_id;
    await db.updateGameQ(game_name, synopsis, sysreq, release_date, developer_id, req.params.game_id);
    res.redirect(`/games/${req.params.game_id}`);
  })
]

addCategoryOnGame = [
  validateCategory,
  asyncHandler (
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
      const game_id = req.params.game_id;
      const game = await db.getGameByIdQ(game_id);  
      const developer = await db.getDeveloperByIdQ(game.developer_id);
      const categories = await db.getCategoriesFromGameQ(game_id);
      res.status(400).render('game', {game : game, developer : developer, categories : categories, errors : errors.array()});
      return;
    }
    const name = req.body.category_name;
    await db.insertGameOnCategoryQ(req.params.game_id, name);
    res.redirect(`/games/${req.params.game_id}`);
  })
]

deleteGame = [
  asyncHandler(
  async (req, res) => {
    const game_id = req.params.game_id;
    await db.deleteGameQ(game_id);
    res.redirect('/games');
  })
]

getGames = asyncHandler(getGames)
getGameById = asyncHandler(getGameById)

module.exports = {
  getGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
  addCategoryOnGame
}