import Router from 'express';
import userController from '../controllers/userController.js'
import authmiddleware from '../middleware/auth.middleware.js';

const userRouter = new Router();

userRouter.get('/', authmiddleware, userController.getMainInfo)

//посты нужно будет переделать на сокетах
userRouter.post('/sendPost', authmiddleware, userController.sendPost)
userRouter.post('/deletePost', authmiddleware, userController.deletePost)
//---------------------------------------

userRouter.get('/people', authmiddleware, userController.getPeople)
userRouter.post('/friends', authmiddleware, userController.setFriends)
userRouter.post('/settings', authmiddleware, userController.setSettings)

//userRouter.get('/dialogues', authmiddleware, userController.getDialogues)
//userRouter.get('/friends', authmiddleware, userController.getFriends)

export default userRouter;
