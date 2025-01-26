const {Router} = require('express');
const controller = require('../controllers/gamesController');

const gamesRouter = Router();

gamesRouter.get('/', controller.getGames);
gamesRouter.get('/:game_id', controller.getGameById)

module.exports = gamesRouter;