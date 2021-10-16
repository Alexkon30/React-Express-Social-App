import React, { useEffect, useContext, useState } from 'react'
import Loader from './Loader'
import axios from 'axios'
import GlobalContext from '../../context/GlobalContext'
import Input from '../UI/Input'
import UserContext from '../../context/UserContext'

function Settings() {
  const { logout } = useContext(GlobalContext)
  const { user, setUser, isLoad, setIsLoad } = useContext(UserContext)
  const [userInfo, setUserInfo] = useState({
    name: '',
    surname: '',
    birthday: '',
    biography: '',
    dateOfRegistration: '',
    //avatar: ''
  })

  useEffect(() => {
    setUserInfo({
      name: user.name,
      surname: user.surname,
      birthday: user.birthday,
      biography: user.biography,
      dateOfRegistration: user.dateOfRegistration
    })
  }, [])

  // const fetchInfo = () => {
  //   setIsLoad(true)
  //   let token = localStorage.getItem('token')
  //   axios({
  //     url: 'http://localhost:5000/user/settings',
  //     method: 'get',
  //     headers: { 'Authorization': `Bearer ${token}` },
  //   })
  //     .then(response => {
  //       //console.log(response.data)
  //       if (response.data.authError === true) {
  //         logout()
  //       }
  //       setUser({
  //         ...JSON.parse(JSON.stringify(user)),
  //         ...userInfo
  //       })
  //       setIsLoad(false)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //       // logout()
  //     })
  // }

  const saveInfo = body => {
    setIsLoad(true)
    let token = localStorage.getItem('token')

    axios({
      url: 'http://localhost:5000/user/settings',
      method: 'post',
      headers: { 'Authorization': `Bearer ${token}` },
      data: {
        ...body
      }
    })
      .then(response => {
        if (response.data.authError === true) {
          logout()
        }

        if (response.data.success === true) {
          setUser({
            ...JSON.parse(JSON.stringify(user)),
            ...userInfo
          })
          setIsLoad(false)
        }
      })
      .catch(err => {
        console.log(err)
        logout() //
      })
  }

  return (
    <div className="content">
      {isLoad
        ? <Loader />
        : <>
          <div className="settings">
            <Input
              input={{
                type: "text",
                value: userInfo.name,
                onChange: (e) => setUserInfo({ ...userInfo, name: e.target.value }),
              }}
              label="Name"
              name="user_name"
              className="settings__field"
            />
            <Input
              input={{
                type: "text",
                value: userInfo.surname,
                onChange: (e) => setUserInfo({ ...userInfo, surname: e.target.value }),
              }}
              label="Surname"
              name="user_surname"
              className="settings__field"
            />
            <Input
              input={{
                type: "date",
                value: userInfo.birthday,
                onChange: (e) => setUserInfo({ ...userInfo, birthday: e.target.value }),
              }}
              label="Birthday"
              name="user_birthday"
              className="settings__field"
            />
            <Input
              input={{
                type: "text",
                value: userInfo.dateOfRegistration,
                disabled: true
              }}
              label="Date of registration"
              name="user_registration"
              className="settings__field"
            />
            <div className="settings__field">
              <label htmlFor="user_biography">Biography</label>
              <textarea
                name="user_biography"
                value={userInfo.biography}
                onChange={(e) => setUserInfo({ ...userInfo, biography: e.target.value })}
              ></textarea>
            </div>
          </div>
          <div className="save__btn">
            <Input
              input={{
                type: 'submit',
                value: 'Save',
                onClick: () => saveInfo(userInfo)
              }} />
          </div>
        </>
      }
    </div>
  )
}

export default Settings
