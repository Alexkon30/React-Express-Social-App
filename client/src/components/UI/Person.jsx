import React, { useState, useContext, useCallback, useEffect } from 'react'
import UserContext from '../../context/UserContext'
import axios from 'axios'
import GlobalContext from '../../context/GlobalContext'
import { Link } from 'react-router-dom'

function Person(props) {
  const { logout } = useContext(GlobalContext)
  const { user, setUser, setIsLoad, setClient } = useContext(UserContext)
  const [isFriend, setIsFriend] = useState(checkFriend(props.id))

  function checkFriend(id) {
    for (let friend of user.friends) {
      if (friend.friendId === props.id) {
        return true
      }
    }
    return false
  }

  const changeFriends = (id, action) => {
    //setIsLoad(true)
    let token = localStorage.getItem('token')
    axios({
      url: `http://localhost:5000/user/friends/`,
      method: 'post',
      headers: { 'Authorization': `Bearer ${token}` },
      data: {
        id,
        action
      }
    })
      .then(response => {
        if (response.data.authError === true) {
          console.log(response.data.message)
          logout()
        }
        if (response.data.success === true) {
          if (action === 'add') {
            setUser({
              ...JSON.parse(JSON.stringify(user)),
              friends: [...user.friends, { name: props.name, surname: props.surname, friendId: props.id }]
            })
            setIsFriend(true)
          } else if (action === 'remove') {
            setUser({
              ...JSON.parse(JSON.stringify(user)),
              friends: user.friends.filter(friend => friend.friendId !== id)
            })
            setIsFriend(false)
          }
          //setIsLoad(false)
        }
      })
      .catch(err => {
        console.log(err.response.data.message)
        //logout()
      })
  }

  const getClientInfo = () => {
    setClient({
      name: props.name,
      surname: props.surname,
      id: props.id
    })
  }

  return (
    <div className="person">
      <div className="person__photo">
        photo
      </div>
      <Link
        className="person__info"
        to={`/people/${props.id}`}
        onClick={getClientInfo}
      >
        {props.name} {props.surname}
      </Link>
      {/* <div className="person__info" onClick={getClientPage(props.id)}>
        {props.name} {props.surname}
      </div> */}
      <div className="person__action">
        {isFriend
          ? <button
            onClick={() => changeFriends(props.id, 'remove')}
          >Remove from friends</button>
          :
          <button
            onClick={() => changeFriends(props.id, 'add')}
          >Add to friends</button>
        }</div>

    </div>
  )
}

export default Person
