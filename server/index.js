import express from 'express'
import mongoose from 'mongoose'
import config from 'config'
import { Server } from 'socket.io'
import { createServer } from 'http'

import corsMiddleware from './middleware/cors.middleware.js'

import mainRouter from './routes/mainRouter.js'
import userRouter from './routes/userRouter.js'
import messengerRouter from './routes/messengerRouter.js'
import socketRouter from './routes/socketRouter.js'

//import authmiddleware from './middleware/auth.middleware.js'

//import expressSession from 'express-session'
//import cookieParser from 'cookie-parser'
//import flash from 'connect-flash'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

const URL = config.get('dbUrl')
const PORT = config.get('serverPort')


app.use(corsMiddleware)
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use('/', mainRouter)
  .use('/user', userRouter)
  .use('/messenger', messengerRouter)

//.use('/user', authmiddleware, userRouter)
//.use(authmiddleware)

//app.use(cookieParser(config.get('secret')))
// app.use(expressSession({
//   secret: config.cookieSecret,
//   resave: true,
//   saveUninitialized: true,
// }))
//app.use(express.static(__dirname + "/public"));
//app.use(flash())

mongoose.connect(URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).then(
  () => {
    httpServer.listen(PORT, () => {
      console.log(`server started on ${PORT}`);
    })
    io.on('connection', socket => socketRouter(socket, io));
  }
).catch(err => {
  console.log(err.message)
})
