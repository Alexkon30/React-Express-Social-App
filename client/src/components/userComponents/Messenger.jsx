import React, { useContext, useEffect } from 'react'
import Loader from './Loader'
import Dialog from '../UI/Dialog'
import UserContext from '../../context/UserContext'

function Messenger() {
  const { setIsLoad, isLoad, user, setClient, setMessages } = useContext(UserContext)

  useEffect(() => {
    return () => {
      setIsLoad(false)
    }
  }, [])

  const setPartner = dialog => {
    setIsLoad(true)
    setClient({ ...dialog, id: dialog.partnerId })

    //загрузить сообщения 
    fetch(`http://localhost:5000/messenger/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        partnerId: dialog.partnerId
      })
    })
      .then(result => result.json())
      .then(response => {
        console.log(response)
        if (response.success === 'true') {
          setMessages(response.messages)
        }
      })
      .catch(err => console.log(err))
    setIsLoad(false)
  }

  return (
    <div className="content">
      {isLoad ?
        <Loader />
        : <>
          <div className="search">
            search..
          </div>
          <div className="friends__list">
            {user.dialogues.length
              ? user.dialogues.map(dialog => <Dialog
                key={dialog.dialogId}
                onClick={() => setPartner(dialog)}
                {...dialog} />)
              : <div>No dialogues</div>}
          </div>
        </>
      }
    </div>
  )
}

export default Messenger
