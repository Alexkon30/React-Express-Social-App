import React, { useState, useContext } from 'react'
import axios from 'axios'
import GlobalContext from '../../context/GlobalContext'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

const Person = observer((props) => {
  const { MainStore, UserStore, ClientStore } = useContext(GlobalContext)
  const [isFriend, setIsFriend] = useState(checkFriend(props.id))

  function checkFriend(id) {
    for (let friend of UserStore.user.friends) {
      if (friend.friendId === props.id) {
        return true
      }
    }
    return false
  }

  const changeFriends = (id, action) => {
    // setIsLoad(true)
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
          MainStore.logout()
        }
        if (response.data.success === true) {
          if (action === 'add') {
            UserStore.setUser({
              ...JSON.parse(JSON.stringify(UserStore.user)),
              friends: [...UserStore.user.friends, { name: props.name, surname: props.surname, friendId: props.id }]
            })
            // MainStore.UserStore.setUserAttr('friends', [...MainStore.UserStore.user.friends, { name: props.name, surname: props.surname, friendId: props.id }])
            setIsFriend(true)
          } else if (action === 'remove') {
            UserStore.setUser({
              ...JSON.parse(JSON.stringify(UserStore.user)),
              friends: UserStore.user.friends.filter(friend => friend.friendId !== id)
            })
            // MainStore.UserStore.setUserAttr('friends', MainStore.UserStore.user.friends.filter(friend => friend.friendId !== id))
            setIsFriend(false)
          }
          // setIsLoad(false)
        }
      })
      .catch(err => {
        console.log(err.response.data.message)
        //logout()
      })
  }

  const getClientInfo = () => {
    ClientStore.setClient({
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
})

export default Person
