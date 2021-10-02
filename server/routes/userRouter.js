import Router from 'express';
import userController from '../controllers/userController.js'
import authmiddleware from '../middleware/auth.middleware.js';

const userRouter = new Router();

userRouter.get('/', authmiddleware, userController.getMainInfo)
userRouter.post('/sendPost', authmiddleware, userController.sendPost)

export default userRouter;
