const {Router} = require('express');
const controller = require('../controllers/indexController');

const indexRouter = Router();

indexRouter.get('/', controller.getIndex);

module.exports = indexRouter;