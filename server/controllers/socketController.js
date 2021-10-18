import Dialog from '../models/Dialog.js'
import Message from '../models/Message.js'
import User from '../models/User.js'

class socketController {
  async sendMessage(msg, socket, io) {

    // let now = new Date();
    // let hours = now.getHours();
    // let minutes = now.getMinutes();
    // let seconds = now.getSeconds();
    // let date = now.getDate();
    // let month = `${now.getMonth() + 1}`.length == 1 ? `0${now.getMonth() + 1}` : `${now.getMonth() + 1}`;
    // let year = now.getFullYear();

    let dialog = await Dialog.find({ members: { $all: [msg.from, msg.to] } })
    if (!dialog.length) {
      dialog = await Dialog.create({ members: [msg.from, msg.to] })
    }
    let message = await Message.create({
      dialogId: dialog[0].id,
      content: msg.content,
      date: Date.now(),
      author: msg.from
    })

    if (message) {
      let author = await User.findById(msg.from)
      io.sockets.emit('message', {
        action: 'new dialog message',
        content: message.content,
        date: message.date,
        author: author.name,
        id: message.id,
        dialogId: message.dialogId
      })
    }
  }

  async deleteMessage(msg, socket) {

  }
}

export default new socketController()
