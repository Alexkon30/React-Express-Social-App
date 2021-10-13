import User from '../models/User.js';
import WallPost from '../models/WallPost.js';



class userController {
  async getMainInfo(req, res) {

    //создаем пустого пользователя для наполнения данными
    let user = {}

    //id пользователя взят из заголовка authorization 
    //с помощью промежуточного ПО auth
    await User.findById(req.userId)
      .then(async result => {
        //начинаем готовить данные к отправке на клиент
        user = {
          name: result.name,
          surname: result.surname,
          birthday: result.birthday,
          biography: result.biography,
          dateOfRegistration: result.dateOfRegistration,
          friends: [], //переделать друзей
          dialogues: result.dialogues, //переделать диалоги
          posts: []
        }

        //переделываем друзей из просто id в name, surname, id
        for (let friend of result.friends) {
          let friendInfo = await User.findById(friend)
          user.friends.push({
            name: friendInfo.name,
            surname: friendInfo.surname,
            friendId: friendInfo.id
          })
        }
      })
      .catch(err => console.log(err))

    //нужно сформировать свойство с постами перед отправкой
    //поиск по всем постам
    await WallPost.find({ wallOwnerId: req.userId })
      .then(async result => {
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

    //переделать друзей
    //для каждого из друзей достаточно имени, фамилии, id, ава

    //переделать диалоги

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
              id: user.id
              //avatar: user.avatar
            }
          })
        res.json({ success: true, users })
      })
  }

  async setFriends(req, res) {
    try {
      let user = await User.findById(req.userId)
      if (req.body.action === 'remove') {
        await User.findByIdAndUpdate(req.userId, {
          friends: user.friends.filter(friend => friend !== req.body.id)
        })
      } else if (req.body.action === 'add') {
        await User.findByIdAndUpdate(req.userId, {
          friends: [...user.friends, req.body.id]
        })
      }
      res.json({ success: true })
    } catch (e) {
      console.log(e)
      res.json({ success: false })
    }
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

  // async getFriends(req, res) {  //придется вернуть т.к. стейт юзер хранит только айди друзей
  //   User.findById(req.userId)   //возвращать не придется т.к. изменил стартовый запрос
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
