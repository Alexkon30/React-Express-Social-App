import React, { useEffect, useState, useContext } from 'react'
import Loader from './Loader'
import axios from 'axios'
import GlobalContext from '../../context/context'
import Input from '../UI/Input'

function Settings() {
  const { logout } = useContext(GlobalContext)
  const [user, setUser] = useState({
    name: '',
    surname: '',
    birthday: '',
    biography: '',
    dateOfRegistration: '',
    //avatar: ''
  })
  const [isLoad, setIsLoad] = useState(false)

  useEffect(() => {
    fetchInfo()
  }, [])

  const fetchInfo = () => {
    setIsLoad(true)
    let token = localStorage.getItem('token')

    axios({
      url: 'http://localhost:5000/user/settings',
      method: 'get',
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then(response => {
        //console.log(response.data)
        if (response.data.authError === true) {
          logout()
        }

        setUser({
          name: response.data.user.name,
          surname: response.data.user.surname,
          birthday: response.data.user.birthday,
          biography: response.data.user.biography,
          dateOfRegistration: response.data.user.dateOfRegistration
        })
        setInterval(() => {
          setIsLoad(false)
        }, 500)
      })
      .catch(err => {
        console.log(err)
        logout()
      })
  }

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
          setInterval(() => {
            setIsLoad(false)
          }, 500)
        }
      })
      .catch(err => {
        console.log(err)
        logout()
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
                value: user.name,
                onChange: (e) => setUser({ ...user, name: e.target.value }),
              }}
              label="Name"
              name="user_name"
              className="settings__field"
            />
            <Input
              input={{
                type: "text",
                value: user.surname,
                onChange: (e) => setUser({ ...user, surname: e.target.value }),
              }}
              label="Surname"
              name="user_surname"
              className="settings__field"
            />
            <Input
              input={{
                type: "date",
                value: user.birthday,
                onChange: (e) => setUser({ ...user, birthday: e.target.value }),
              }}
              label="Birthday"
              name="user_birthday"
              className="settings__field"
            />
            <Input
              input={{
                type: "text",
                value: user.dateOfRegistration,
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
                value={user.biography}
                onChange={(e) => setUser({ ...user, biography: e.target.value })}
              ></textarea>
            </div>
          </div>
          <div className="save__btn">
            <Input
              input={{
                type: 'submit',
                value: 'Save',
                onClick: () => saveInfo(user)
              }} />
          </div>
        </>
      }
    </div>
  )
}

export default Settings
