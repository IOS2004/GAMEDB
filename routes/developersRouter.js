const {Router} = require('express');
const controller = require('../controllers/developersController');

const developersRouter = Router();

developersRouter.get('/', controller.getDevelopers);
developersRouter.get('/:developer_id', controller.getDeveloperById)

module.exports = developersRouter;