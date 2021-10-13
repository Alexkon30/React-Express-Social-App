import Router from 'express';
import mainController from '../controllers/mainController.js'

const mainRouter = new Router();

mainRouter.post('/register', mainController.register)
mainRouter.post('/login', mainController.login)

//mainRouter.post('/test', mainController.test)
//mainRouter.post('/', mainController.check)
//mainRouter.get('/logout', mainController.out)

export default mainRouter;
