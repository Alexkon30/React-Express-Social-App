import React, { useState, useContext, useEffect } from 'react'
import Loader from './Loader'
import axios from 'axios'
import GlobalContext from '../../context/context'

function Userpage() {
  const { logout } = useContext(GlobalContext)

  // eslint-disable-next-line
  const [user, setUser] = useState({
    name: 'Name',
    biography: 'Biography'
  });
  const [isLoad, setIsLoad] = useState(false)

  // useEffect(() => {
  //   userAxios()
  // }, [])

  const userAxios = () => {
    setIsLoad(true)

    axios({
      url: 'http://localhost:5000/user/',
      method: 'get',
      headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userData')).token}` },
    })
      .then(response => {
        //console.log(response.data)
        if (response.data.success === false) {
          logout()
        }

        setTimeout(() => {
          setIsLoad(false)
        }, 1000)

      })
      .catch(err => console.log(err.response))
  }

  if (isLoad) {
    return (
      <Loader />
    )
  }

  return (
    <div className="content">
      <div className="user__header">
        <div className="user__photo">Photo</div>
        <div className="user__description">
          <div className="user__name">user.name</div>
          <div className="user__biography">user.biography</div>
          <div className="user__change">Change btn</div>
        </div>
      </div>
      <div className="user__wall">Wall</div>
      <button onClick={userAxios}>Test</button>
    </div>
  )
}

export default Userpage
