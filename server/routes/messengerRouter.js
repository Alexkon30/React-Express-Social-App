import Router from 'express'
import messengerController from '../controllers/messengerController.js'
import authmiddleware from '../middleware/auth.middleware.js';

const messengerRouter = new Router()

messengerRouter.post('/', authmiddleware, messengerController.getMessages)

export default messengerRouter
