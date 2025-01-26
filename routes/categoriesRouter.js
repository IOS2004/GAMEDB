const {Router} = require('express');
const controller = require('../controllers/categoriesController');

const categoriesRouter = Router();

categoriesRouter.get('/', controller.getCategories);
categoriesRouter.get('/:name', controller.getGamesFromCategory)

module.exports = categoriesRouter;