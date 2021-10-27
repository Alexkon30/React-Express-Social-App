import React, { useEffect, useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import GlobalContext from '../../context/GlobalContext'
import Message from '../UI/Message'
import Loader from './Loader'
import socket from '../../socket'
import { observer } from 'mobx-react-lite'

const DialogPage = observer(() => {
  const { MainStore, UserStore, ClientStore } = useContext(GlobalContext)

  useEffect(() => {
    return MainStore.setMessages([])
    // setClient({
    //   name: '',
    //   surname: '',
    //   id: ''
    // })
    // eslint-disable-next-line
  }, [])

  const messageRef = useRef()

  const sendMessage = () => {
    socket.send({
      action: 'send',
      content: messageRef.current.value,
      from: UserStore.user.id,
      to: ClientStore.client.id
    })
    messageRef.current.value = ''
  }

  socket.on('message', msg => {
    if (msg.action === 'new dialog message' && msg.dialogId === ClientStore.client.dialogId) {
      MainStore.setMessages([...MainStore.messages, {
        content: msg.content,
        date: msg.date,
        author: msg.author,
        id: msg.id
      }])
    }
  })

  return (
    <div className='content'>
      {MainStore.isLoad
        ? <Loader />
        : <>
          <Link
            to={`/people/${ClientStore.client.id}`}

          >{ClientStore.client.name} {ClientStore.client.surname}</Link>
          <div className='dialog__content'>
            {MainStore.messages.length
              ? MainStore.messages.map((message, index) => <Message key={message.id} {...message} />)
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
})

export default DialogPage
