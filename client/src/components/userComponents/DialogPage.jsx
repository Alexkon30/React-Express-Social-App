import React, { useEffect, useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import Message from '../UI/Message'
import Loader from './Loader'
import socket from '../../socket'

const DialogPage = () => {
  const { messages, setMessages, isLoad, client, user } = useContext(UserContext)

  useEffect(() => {
    return setMessages([])
    // setClient({
    //   name: '',
    //   surname: '',
    //   id: ''
    // })

  }, [])

  const messageRef = useRef()

  const sendMessage = () => {
    socket.send({
      action: 'send',
      content: messageRef.current.value,
      from: user.id,
      to: client.id
    })
    messageRef.current.value = ''
  }

  socket.on('message', msg => {
    if (msg.action === 'new dialog message' && msg.dialogId === client.dialogId) {
      setMessages([...messages, {
        content: msg.content,
        date: msg.date,
        author: msg.author,
        id: msg.id
      }])
    }
  })

  return (
    <div className='content'>
      {isLoad
        ? <Loader />
        : <>
          <Link
            to={`/people/${client.id}`}

          >{client.name} {client.surname}</Link>
          <div className='dialog__content'>
            {messages.length
              ? messages.map((message, index) => <Message key={message.id} {...message} />)
              : <div>No messages</div>
            }
          </div>
          <div className='dialog__footer'>
            <textarea rows="1" ref={messageRef}></textarea>
            <button onClick={sendMessage}>Send</button>
          </div>
        </>}
    </div>
  )
}

export default DialogPage
