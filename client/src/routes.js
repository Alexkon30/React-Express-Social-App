import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Aside from './components/userComponents/Aside'
//import Login from './pages/Login'
import Loginform from './components/Loginform'
import Registerform from './components/Registerform'
import UserPage from './components/userComponents/UserPage'
import Friends from './components/userComponents/Friends'
import Messages from './components/userComponents/Messages'
import Settings from './components/userComponents/Settings'


function useRoutes(isAuth) {

  if (isAuth) {
    return (
      <div className="container">
        <Aside />
        <Switch>
          <Route path="/user" component={UserPage} />
          <Route path="/friends" component={Friends} />
          <Route path="/messages" component={Messages} />
          <Route path="/settings" component={Settings} />
          <Redirect to="/user" />
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
