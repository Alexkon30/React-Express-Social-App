import User from '../models/User.js';
import WallPost from '../models/WallPost.js';



class userController {
  async getMainInfo(req, res) {

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
          biography: result.biography,
          dateOfRegistration: result.dateOfRegistration,
          friends: result.friends,
          dialogs: result.dialogs,
          posts: []
        }
      })
      .catch(err => console.log(err))

    //нужно сформировать свойство с постами перед отправкой
    //поиск по всем постам
    await WallPost.find({ wallOwnerId: req.userId })
      .then(async result => {
        //создаем свойство с пустым массивом
        // user.posts = [];
        //пройтись по всем найденным постам и сформировать массив постов
        //для отображения на клиенте
        for (let post of result) {
          //поиск автора поста по id, который есть в схеме поста
          const author = await User.findById(post.authorId)
          user.posts.push({
            content: post.content,
            author: author.name,
            date: post.date,
            id: post.id
          })
        }
      })
      .catch(err => console.log(err))
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
        res.json({ success: true, postId: result.id })
      })
      .catch(err => {
        console.log(err)
        res.json({ success: false, message: err.message })
      })
  }

  async deletePost(req, res) {
    WallPost.findByIdAndDelete(req.body.postId)
      .then(result => {
        res.json({ success: true, message: 'Post was deleted successfully' })
      })
      .catch(err => res.json({ success: false, message: err.message }))
  }

  async getPeople(req, res) {
    User.find({})
      .then(result => {
        let users = result
          .filter(user => user.id !== req.userId)
          .map(user => {
            return {
              name: user.name,
              surname: user.surname,
              //avatar: user.avatar
            }
          })
        res.json({ success: true, users })
      })
  }

  async getSettings(req, res) {
    User.findById(req.userId)
      .then(result => {
        let user = {
          name: result.name,
          surname: result.surname,
          birthday: result.birthday,
          biography: result.biography,
          dateOfRegistration: result.dateOfRegistration
        }
        res.json({ success: true, user })
      })
      .catch(err => res.json({ success: false, message: err.message }))
  }

  async setSettings(req, res) {
    User.findByIdAndUpdate(req.userId, {
      name: req.body.name,
      surname: req.body.surname,
      birthday: req.body.birthday,
      biography: req.body.biography
    })
      .then(result => {
        res.json({ success: true })
      })
      .catch(err => res.json({ success: false, message: err.message }))
  }

  // async getFriends(req, res) {
  //   User.findById(req.userId)
  //     .then(async result => {
  //       let friends = []
  //       for (let id of result.friends) {
  //         let friend = await User.findById(id)
  //         friends.push({
  //           name: friend.name,
  //           surname: friend.surname,
  //           //avatar: friend.avatar
  //         })
  //       }
  //       res.json({ success: true, friends })
  //     })
  //     .catch(err => res.json({ success: false, message: err.message }))
  // }

  async getDialogues(req, res) {
    User.findById(req.userId)
      .then(async result => {
        let dialogues = []
        for (let id of result.friends) {
          let friend = await User.findById(id)
          dialogues.push({
            name: friend.name,
            surname: friend.surname,
            //lastMessage: 
            //avatar: friend.avatar
          })
        }
        res.json({ success: true, dialogues })
      })
      .catch(err => res.json({ success: false, message: err.message }))
  }
}

export default new userController();
