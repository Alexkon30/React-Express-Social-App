import React, { useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Aside from './components/userComponents/Aside'
import Loginform from './components/Loginform'
import Registerform from './components/Registerform'
import UserPage from './components/userComponents/UserPage'
import Friends from './components/userComponents/Friends'
import Messenger from './components/userComponents/Messenger'
import Settings from './components/userComponents/Settings'
import People from './components/userComponents/People'
import DialogPage from './components/userComponents/DialogPage'

import UserContext from './context/UserContext'
import Client from './components/userComponents/Client'

// import MainStore from './store/mainStore'


function useRoutes(isAuth) {
  const [user, setUser] = useState({
    id: '',
    name: '',
    surname: '',
    biography: '',
    birthday: '',
    dateOfRegistration: '',
    dialogues: [],
    posts: [],
    friends: []
  });
  const [client, setClient] = useState({
    name: '',
    surname: '',
    id: ''
  })
  const [isLoad, setIsLoad] = useState(false)
  const [messages, setMessages] = useState([])

  if (isAuth) {
    return (
      <div className="container">
        <Aside />
        <Switch>
          <UserContext.Provider value={{
            user, setUser, isLoad, setIsLoad, client, setClient, messages, setMessages
          }}>
            <Route path="/user" component={UserPage} />
            <Route path="/people" exact component={People} />
            <Route path="/friends" component={Friends} />
            <Route path="/messenger" exact component={Messenger} />
            <Route path="/settings" component={Settings} />
            <Route path="/people/:id" component={Client} />
            <Route path="/messenger/:id" component={DialogPage} />
            <Redirect to="/user" />
          </UserContext.Provider>
        </Switch>
      </div>
    )
  }

  return (
    <Switch>
      <Route path="/login" component={Loginform} />
      <Route path="/register" component={Registerform} />
      <Redirect to="/login" />
    </Switch>
  )
}

export default useRoutes
