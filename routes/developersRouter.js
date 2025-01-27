const {Router} = require('express');
const controller = require('../controllers/developersController');

const developersRouter = Router();

developersRouter.get('/', controller.getDevelopers);
developersRouter.get('/:developer_id', controller.getDeveloperById)
developersRouter.post('/create', createDeveloper)
developersRouter.post('/:developer_id/update', updateDeveloper)
developersRouter.post('/:developer_id/delete', deleteDeveloper)

module.exports = developersRouter;