import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import config from 'config';
import mainRouter from './routes/mainRouter.js'
import corsMiddleware from './middleware/cors.middleware.js'

//import expressSession from 'express-session';
//import cookieParser from 'cookie-parser';
//import flash from 'connect-flash';

const app = express();
const URL = config.get('dbUrl');
//const __dirname = path.resolve();
const PORT = config.get('serverPort');


app.use(corsMiddleware)
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use('/', mainRouter)

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
    app.listen(PORT, () => {
      console.log(`server started on ${PORT}`);
    })
  }
).catch(err => {
  console.log(err.message)
})
