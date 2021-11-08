import Dialog from '../models/Dialog.js'
import Message from '../models/Message.js'
import User from '../models/User.js'

class messengerController {
  async getMessages(req, res) {
    let dialog = await Dialog.find({ members: { $all: [req.body.partnerId, req.userId] } })
    if (!dialog.length) {
      dialog = await Dialog.create({ members: [msg.from, msg.to] })
    }

    Message.find({ dialogId: dialog[0].id })
      .then(async result => {
        let messages = []
        for (let message of result) {
          let author = await User.findById(message.authorId)
          messages.push({
            content: message.content,
            date: message.date,
            authorName: author.name,
            authorId: author.id,
            id: message.id,
          })
        }
        res.send(JSON.stringify({ messages, success: 'true' }))
      })
  }
}

export default new messengerController()
