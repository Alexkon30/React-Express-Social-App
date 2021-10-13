import React, { useContext, useState, useEffect } from 'react'
import GlobalContext from '../../context/GlobalContext'
import axios from 'axios'
import Loader from './Loader'
import Dialog from '../UI/Dialog'
import UserContext from '../../context/UserContext'

function Friends() {
  const { logout } = useContext(GlobalContext)
  const { isLoad, setIsLoad, user, setUser } = useContext(UserContext)
  // const [isLoad, setIsLoad] = useState(false)
  // const [dialogues, setDialogues] = useState([])

  //в диалогах надо разобраться как прикрутить сокеты и убрать вот это вот внизу

  // useEffect(() => {
  //   dialoguesAxios()
  // }, [])

  // const dialoguesAxios = () => {
  //   setIsLoad(true)
  //   let token = localStorage.getItem('token')
  //   axios({
  //     url: 'http://localhost:5000/user/dialogues/',
  //     method: 'get',
  //     headers: { 'Authorization': `Bearer ${token}` },
  //   })
  //     .then(response => {
  //       //console.log(response.data)
  //       if (response.data.authError === true) {
  //         console.log(response.data.message)
  //         logout()
  //       }
  //       setDialogues(response.data.dialogues)
  //       setInterval(() => {
  //         setIsLoad(false)
  //       }, 500)
  //     })
  //     .catch(err => {
  //       console.log(err.response.data.message)
  //       //logout()
  //     })
  // }

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
              ? user.dialogues.map((dialog, index) => <Dialog key={index} {...dialog} />)
              : <div>No dialogues</div>}
          </div>
        </>
      }
    </div>
  )
}

export default Friends
