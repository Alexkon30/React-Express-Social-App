import React, { useState, useContext } from 'react'
import UserContext from '../../context/UserContext'
import axios from 'axios'
import GlobalContext from '../../context/context'

function Person(props) {
  const { logout } = useContext(GlobalContext)
  const { user, setUser, setIsLoad } = useContext(UserContext)
  const [isFriend, setIsFriend] = useState(user.friends.includes(props.id))
  //переделать стэйт из пропсов в поиск юзера по айди из стейта друзей юзера
  //при добавлении в друзья должно произойти изменение в трех местах
  //1. в стейт юзера должен добавиться френд
  //2. в стейте изФренд должен измениться на противоположный
  //3. должен уйти запрос на сервер и в зависимости от него произойдут 
  //два предыдущих

  const addToFriends = id => {
    setIsLoad(true)
    let token = localStorage.getItem('token')
    axios({
      url: `http://localhost:5000/user/add_friend/${id}`,
      method: 'get',
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then(response => {
        //console.log(response.data)
        if (response.data.authError === true) {
          console.log(response.data.message)
          logout()
        }
        if (response.data.success === true) {
          setUser({
            ...JSON.parse(JSON.stringify(user)),
            friends: [...user.friends, id]
          })
          setIsLoad(false)
          setIsFriend(true)
        }
      })
      .catch(err => {
        console.log(err.response.data.message)
        //logout()
      })
  }

  const removeFromFriends = id => {
    setIsLoad(true)
    let token = localStorage.getItem('token')

    axios({
      url: `http://localhost:5000/user/remove_friend/${id}`,
      method: 'get',
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then(response => {
        //console.log(response.data)
        if (response.data.authError === true) {
          console.log(response.data.message)
          logout()
        }

        if (response.data.success === true) {
          setUser({
            ...JSON.parse(JSON.stringify(user)),
            friends: user.friends.filter(friend => friend.id !== id)
          })
          setIsLoad(false)
          setIsFriend(false)
        }
      })
      .catch(err => {
        console.log(err.response.data.message)
        //logout()
      })
  }

  return (
    <div className="person">
      <div className="person__photo">
        photo
      </div>
      <div className="person__info">
        {props.name} {props.surname}
      </div>
      {isFriend
        ? <div className="add_person_to_friends">
          <button
            onClick={() => removeFromFriends(props.id)}
          >Remove from friend</button>
        </div>
        : <div className="add_person_to_friends">
          <button
            onClick={() => addToFriends(props.id)}
          >Add to friend</button>
        </div>}

    </div>
  )
}

export default Person
