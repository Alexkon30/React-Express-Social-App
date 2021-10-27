import React, { useContext, useState, useEffect } from 'react'
import Loader from './Loader'
import GlobalContext from '../../context/GlobalContext'
import axios from 'axios'
import Person from '../UI/Person'
import { observer } from 'mobx-react-lite'

const People = observer(() => {
  const { MainStore } = useContext(GlobalContext)
  const [people, setPeople] = useState([])

  useEffect(() => {
    usersAxios()
    // eslint-disable-next-line
  }, [])

  function usersAxios() {
    MainStore.setLoad(true)
    let token = localStorage.getItem('token')

    axios({
      url: 'http://localhost:5000/user/people/',
      method: 'get',
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then(response => {
        //console.log(response.data)
        if (response.data.authError === true) {
          console.log(response.data.message)
          MainStore.logout()
        }
        MainStore.setLoad(false)
        setPeople(response.data.users)
      })
      .catch(err => {
        console.log(err.response.data.message)
        MainStore.logout() //
      })
  }

  return (
    <div className="content">
      {MainStore.isLoad ?
        <Loader />
        : <>
          <div className="search">
            search..
          </div>
          <div className="people__list">
            {people.length
              ? people.map((person, index) => <Person key={index} {...person} />)
              : <div>No people</div>}
          </div>
        </>
      }
    </div>
  )
})

export default People
