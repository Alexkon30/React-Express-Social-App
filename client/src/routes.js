import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Userpage from './pages/Usergape'


function useRoutes(isAuth) {

  if (isAuth) {
    return (
      <Switch>
        <Route path="/user" component={Userpage} />
        <Redirect to="/user" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Redirect to="/login" />
    </Switch>
  )
}

export default useRoutes
