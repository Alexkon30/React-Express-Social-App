import express from 'express';
import mongoose from 'mongoose';
import config from 'config';
import mainRouter from './routes/mainRouter.js'
import userRouter from './routes/userRouter.js'
import corsMiddleware from './middleware/cors.middleware.js'
import { Server } from 'socket.io'
import { createServer } from 'http'
//import authmiddleware from './middleware/auth.middleware.js'

//import expressSession from 'express-session';
//import cookieParser from 'cookie-parser';
//import flash from 'connect-flash';

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)
const URL = config.get('dbUrl')
const PORT = config.get('serverPort')


app.use(corsMiddleware)
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use('/', mainRouter)
  .use('/user', userRouter)

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

// app.use('/user', userRouter);
// app.use('/messenger', messengerRouter);


mongoose.connect(URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).then(
  () => {
    httpServer.listen(PORT, () => {
      console.log(`server started on ${PORT}`);
    })
  }
).catch(err => {
  console.log(err.message)
})
