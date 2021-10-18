import User from '../models/User.js';
import WallPost from '../models/WallPost.js';
import Dialog from '../models/Dialog.js'


class userController {
  async getMainInfo(req, res) {

    //id пользователя взят из заголовка authorization 
    //с помощью промежуточного ПО auth
    await User.findById(req.userId)
      .then(async result => {
        let user = {
          id: result.id,
          name: result.name,
          surname: result.surname,
          birthday: result.birthday,
          biography: result.biography,
          dateOfRegistration: result.dateOfRegistration,
          friends: [],
          dialogues: [],
          posts: []
        }

        //готовим список друзей
        for (let friend of result.friends) {
          let friendInfo = await User.findById(friend)
          user.friends.push({
            name: friendInfo.name,
            surname: friendInfo.surname,
            friendId: friendInfo.id
          })
        }

        //готовим список диалогов
        for (let dialogId of result.dialogues) {
          let dialog = await Dialog.findById(dialogId)
          let partner = await User.findById(dialog.members.filter(id => id !== req.userId)[0])
          user.dialogues.push({
            name: partner.name,         //имя собеседника
            surname: partner.surname,   //surname собеседника
            partnerId: partner.id,      //id собеседника
            dialogId                    //id диалога
          })
        }

        //готовим список постов
        let posts = await WallPost.find({ wallOwnerId: req.userId })
        for (let post of posts) {
          const author = await User.findById(post.authorId)
          user.posts.push({
            content: post.content,
            author: author.name,
            date: post.date,
            id: post.id
          })
        }

        res.json({ success: true, user })
      })
      .catch(err => console.log(err.message))
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
}

export default new userController();
