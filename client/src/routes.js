import React, { useContext } from 'react'
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
import GlobalContext from './context/GlobalContext'
import { Box, Container } from '@mui/material'
import { observer } from 'mobx-react-lite'


const Routes = observer(() => {
  const { MainStore } = useContext(GlobalContext)

  return (
    <Box
      sx={{
        // border: '1px solid green',
        mt: 2,
        p: 5,
      }}>
      <Switch>
        {MainStore.isAuth ?
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
          <Container component="main" maxWidth="xs">
            <Route path="/login" component={Loginform} />
            <Route path="/register" component={Registerform} />
            <Redirect to="/login" />
          </Container>
        }
      </Switch>
    </Box>
  )
})

export default Routes
