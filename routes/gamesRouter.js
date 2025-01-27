const {Router} = require('express');
const controller = require('../controllers/gamesController');

const gamesRouter = Router();

gamesRouter.get('/', controller.getGames);
gamesRouter.get('/:game_id', controller.getGameById);
gamesRouter.post('/create', createGame);
gamesRouter.post('/:game_id/update', updateGame)
gamesRouter.post('/:game_id/delete', deleteGame)

module.exports = gamesRouter;