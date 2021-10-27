import React, { useContext, useEffect } from 'react'
import Loader from './Loader'
import Dialog from '../UI/Dialog'
import GlobalContext from '../../context/GlobalContext'
import { observer } from 'mobx-react-lite'

const Messenger = observer(() => {
  const { MainStore, UserStore, ClientStore } = useContext(GlobalContext)

  useEffect(() => {
    return () => {
      MainStore.setLoad(false)
    }
    // eslint-disable-next-line
  }, [])

  const setPartner = dialog => {
    MainStore.setLoad(true)
    ClientStore.setClient({ ...dialog, id: dialog.partnerId })

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
          MainStore.setMessages(response.messages)
        }
      })
      .catch(err => console.log(err))
    MainStore.setLoad(false)
  }

  return (
    <div className="content">
      {MainStore.isLoad ?
        <Loader />
        : <>
          <div className="search">
            search..
          </div>
          <div className="friends__list">
            {UserStore.user.dialogues.length
              ? UserStore.user.dialogues.map(dialog => <Dialog
                key={dialog.dialogId}
                onClick={() => setPartner(dialog)}
                {...dialog} />)
              : <div>No dialogues</div>}
          </div>
        </>
      }
    </div>
  )
})

export default Messenger
