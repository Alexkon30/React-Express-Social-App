import Dialog from '../models/Dialog.js'
import Message from '../models/Message.js'
import User from '../models/User.js'

class socketController {
  async sendMessage(msg, socket, io) {

    let dialog = await Dialog.find({ members: { $all: [msg.from, msg.to] } })
    if (!dialog.length) {
      dialog = [await Dialog.create({ members: [msg.from, msg.to] })]
    }
    let message = await Message.create({
      dialogId: dialog[0].id,
      content: msg.content,
      date: Date.now(),
      authorId: msg.from
    })
    // console.log(message)

    if (message) {
      let author = await User.findById(msg.from)
      // console.log(author)
      io.sockets.emit('message', {
        action: 'new dialog message',
        content: message.content,
        date: message.date,
        authorName: author.name,
        authorId: author.id,
        id: message.id,
        dialogId: message.dialogId
      })
    }
  }

  async deleteMessage(msg, socket) {

  }
}

export default new socketController()
