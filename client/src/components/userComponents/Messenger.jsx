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
    setClient({
      name: dialog.name,
      surname: dialog.surname,
      id: dialog.id
    })

    //загрузить сообщения 
    fetch(`http://localhost:5000/messenger/`, { //в id хранится не диалог, а собеседник
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        companionId: dialog.id
      })
    })
      .then(result => result.json())
      .then(response => {
        console.log(response)
        if (response.success === 'true') {
          setMessages(response.messages)
        }
        setIsLoad(false)
      })
      .catch(err => console.log(err))

    // axios({
    //   url: 'http://localhost:5000/messenger/',
    //   method: 'get',
    //   headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    // })

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
              ? user.dialogues.map((dialog, index) => <Dialog
                key={index}
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
