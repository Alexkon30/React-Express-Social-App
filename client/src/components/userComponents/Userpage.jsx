import React, { useContext, useEffect } from 'react'
import Loader from './Loader'
import axios from 'axios'
import GlobalContext from '../../context/GlobalContext'
import { Link } from 'react-router-dom'
import Userwall from './Userwall'
import WallPostForm from './WallPostForm'
import { observer } from 'mobx-react-lite'
// import { Box } from '@mui/material'

const UserPage = observer(() => {
  const { MainStore, UserStore } = useContext(GlobalContext)

  useEffect(() => {
    userAxios()
    // eslint-disable-next-line
  }, [])

  const userAxios = () => {
    MainStore.setLoad(true)
    let token = localStorage.getItem('token')

    axios({
      url: 'http://192.168.1.5:5000/user/',
      method: 'get',
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then(response => {
        if (response.data.authError === true) {
          MainStore.logout()
        }
        UserStore.setUser(response.data.user)
        setTimeout(() => {
          MainStore.setLoad(false)
        }, 2000)
      })
      .catch(err => {
        console.log(err)
        MainStore.logout()
      })
  }

  return (
    <>
      {
        MainStore.isLoad ?
          <Loader />
          : <><div className="user__header">
            <div className="user__photo">Photo</div>
            <div className="user__description">
              <div className="user__name">{UserStore.user.name} {UserStore.user.surname}</div>
              <div className="user__biography">{UserStore.user.biography}</div>
              <div className="user__birthday">{UserStore.user.birthday}</div>
              <Link to="/settings" className="user__change">Change user info</Link>
            </div>
          </div>
            <WallPostForm />
            <Userwall />
          </>
      }
    </>
  )
})

export default UserPage
