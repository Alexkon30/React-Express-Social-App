import React, { useContext } from 'react'
// import GlobalContext from '../../context/context'
// import axios from 'axios'
import Loader from './Loader'
import Person from '../UI/Person'
import UserContext from '../../context/UserContext'

function Friends() {
  // const { logout } = useContext(GlobalContext)
  const { user, isLoad } = useContext(UserContext)

  // const friendsAxios = () => {
  //   setIsLoad(true)
  //   let token = localStorage.getItem('token')

  //   axios({
  //     url: 'http://localhost:5000/user/friends/',
  //     method: 'get',
  //     headers: { 'Authorization': `Bearer ${token}` },
  //   })
  //     .then(response => {
  //       //console.log(response.data)
  //       if (response.data.authError === true) {
  //         console.log(response.data.message)
  //         logout()
  //       }
  //       setUser(response.data.friends)
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
            {user.friends.length
              ? user.friends.map((friend, index) => <Person key={index} {...friend} />)
              : <div>No friends --- btn to people page</div>}
          </div>
        </>
      }
    </div>
  )
}

export default Friends
