import socketController from '../controllers/socketController.js'

const socketRouter = (socket, io) => {
  socket.on('message', msg => {
    try {
      switch (msg.action) {
        case 'send':
          socketController.sendMessage(msg, socket, io)
          break;
        case 'delete':
          socketController.deleteMessage(msg, socket)
          break;
      }
    } catch (err) {
      console.log(err)
    }
  })
}

export default socketRouter
