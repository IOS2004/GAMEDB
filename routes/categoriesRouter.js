const {Router} = require('express');
const controller = require('../controllers/categoriesController');

const categoriesRouter = Router();

categoriesRouter.get('/', controller.getCategories);
categoriesRouter.get('/:name', controller.getGamesFromCategory)
categoriesRouter.post('/create',  controller.createCategory)
categoriesRouter.post('/:name/update', controller.updateCategory)
categoriesRouter.post('/:name/delete', controller.deleteCategory)
categoriesRouter.post('/:name/add_game', controller.addGameOnCategory)

module.exports = categoriesRouter;