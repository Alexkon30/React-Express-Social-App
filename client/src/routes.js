import React from 'react'
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
import Client from './components/userComponents/Client'



function useRoutes(isAuth) {

  return (
    <Switch>
      {isAuth ?
        <>
          <Aside />
          <Route path="/user" component={UserPage} />
          <Route path="/people" exact component={People} />
          <Route path="/friends" component={Friends} />
          <Route path="/messenger" exact component={Messenger} />
          <Route path="/settings" component={Settings} />
          <Route path="/people/:id" component={Client} />
          <Route path="/messenger/:id" component={DialogPage} />
          <Redirect to="/user" />
        </>
        :
        <>
          <Route path="/login" component={Loginform} />
          <Route path="/register" component={Registerform} />
          <Redirect to="/login" />
        </>
      }
    </Switch>
  )
}

export default useRoutes
