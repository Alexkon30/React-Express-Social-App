import React, { useContext } from 'react'
import Loader from './Loader'
import Friend from '../UI/Friend'
import UserContext from '../../context/UserContext'
import { Link } from 'react-router-dom'

const Friends = () => {
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
              ? user.friends.map((friend, index) => <Friend key={index} {...friend} id={friend.friendId} />)
              : <>
                <div>No friends</div>
                <Link to='/people'>Find new friends</Link>
              </>}
          </div>
        </>
      }
    </div>
  )
}

export default Friends
