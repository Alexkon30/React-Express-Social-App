import User from '../models/User.js';
import WallPost from '../models/WallPost.js';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import config from 'config';


// const generateAccessToken = (id) => {
//   const payload = { id }
//   return jwt.sign(payload, config.secret, { expiresIn: '1h' });
// }


class userController {
  async getMainInfo(req, res) {
    // console.log('req.userId: ', req.userId)

    //создаем пустого пользователя для наполнения данными
    let user = {}

    //id пользователя взят из заголовка authorization 
    //с помощью промежуточного ПО auth
    await User.findById(req.userId)
      .then(result => {
        //начинаем готовить данные к отправке на клиент
        user = {
          name: result.name,
          surname: result.surname,
          birthday: result.birthday,
          biography: result.biography
        }
      })
      .catch(err => console.log(err))

    //нужно сформировать свойство с постами перед отправкой
    //поиск по всем постам
    await WallPost.find({ wallOwnerId: req.userId })
      .then(async result => {
        //создаем свойство с пустым массивом
        user.posts = [];

        //пройтись по всем найденным постам и сформировать массив постов
        //для отображения на клиенте
        for (let post of result) {

          //поиск автора поста по id, который есть в схеме поста
          const author = await User.findById(post.authorId)
          user.posts.push({
            content: post.content,
            author: author.name,
            date: post.date
          })
        }


        // user.posts = result.map(async post => {
        //   const author = await User.findById(post.authorId)
        //   return {
        //     content: post.content,
        //     author: author.name,
        //     date: post.date
        //   }
        // })
      })
      .catch(err => console.log(err))

    //console.log(user)
    res.json({ success: true, user })
  }

  async sendPost(req, res) {

    //создать пустой пост 
    let post = {}

    WallPost.create({
      authorId: req.userId,
      date: Date.now(),
      content: req.body.description,
      wallOwnerId: req.userId
    })
      .then(result => {
        // const user = await User.findById(result.authorId)

        // post = {
        //   author: user.name,
        //   date: result.date,
        //   content: result.content
        // }

        console.log(result)
        res.json({ success: true })
      })
      .catch(err => {
        console.log(err)
        res.json({ success: false, message: err.message })
      })
  }

}

export default new userController();


// const token = generateAccessToken(user.id);
// res.cookie('token', token, {
//   httpOnly: true,
// });
