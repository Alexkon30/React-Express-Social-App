import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Container, Grid } from '@mui/material'
import { observer } from 'mobx-react-lite'
import GlobalContext from '../context/GlobalContext'

import Aside from '../components/Aside'
import Loginform from '../pages/Loginform'
import Registerform from '../pages/Registerform'
import UserPage from '../pages/UserPage'
import Friends from '../pages/Friends'
import Messenger from '../pages/Messenger'
import Settings from '../pages/Settings'
import People from '../pages/People'
import DialogPage from '../pages/DialogPage'
import Client from '../pages/Client'


const Routes = observer(() => {
  const { MainStore } = useContext(GlobalContext)

  return (
    <Grid item pt={1} xs
      sx={{
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
      }}>
      <Switch>
        {MainStore.isAuth ?
          <Grid container maxWidth='1366px'>
            <Grid item component="aside" md={3}
              sx={{
                padding: '6px',
                '@media (max-width: 900px)': {
                  display: 'none'
                }
              }}>
              <Aside />
            </Grid>
            <Grid item component="main" md={9} sm={12}>
              <Route path="/user" component={UserPage} />
              <Route path="/people" exact component={People} />
              <Route path="/friends" component={Friends} />
              <Route path="/messenger" exact component={Messenger} />
              <Route path="/settings" component={Settings} />
              <Route path="/people/:id" component={Client} />
              <Route path="/messenger/:id" component={DialogPage} />
              <Redirect to="/user" />
            </Grid>
          </Grid>
          :
          <Container component="main" maxWidth="xs">
            <Route path="/login" component={Loginform} />
            <Route path="/register" component={Registerform} />
            <Redirect to="/login" />
          </Container>
        }
      </Switch>
    </Grid>
  )
})

export default Routes
