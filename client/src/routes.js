import React, { useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Aside from './components/userComponents/Aside'
//import Login from './pages/Login'
import Loginform from './components/Loginform'
import Registerform from './components/Registerform'
import UserPage from './components/userComponents/UserPage'
import Friends from './components/userComponents/Friends'
import Messages from './components/userComponents/Messages'
import Settings from './components/userComponents/Settings'
import People from './components/userComponents/People'

import UserContext from './context/UserContext'


function useRoutes(isAuth) {
  const [user, setUser] = useState({
    name: '',
    surname: '',
    biography: '',
    birthday: '',
    posts: [],
  });
  const [isLoad, setIsLoad] = useState(false)

  if (isAuth) {
    return (
      <div className="container">
        <Aside />
        <Switch>
          <UserContext.Provider value={{
            user, setUser, isLoad, setIsLoad
          }}>
            <Route path="/user" component={UserPage} />
            <Route path="/people" component={People} />
            <Route path="/friends" component={Friends} />
            <Route path="/messages" component={Messages} />
            <Route path="/settings" component={Settings} />
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
