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
import { Container, Grid } from '@mui/material'
import { observer } from 'mobx-react-lite'


const Routes = observer(() => {
  const { MainStore } = useContext(GlobalContext)

  return (
    <Grid item pt={1} xs
      sx={{
        // border: '3px solid green',
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
      }}>
      <Switch>
        {MainStore.isAuth ?
          <Grid container
            maxWidth='1366px'
          >
            <Grid item component="aside" md={3}
              sx={{
                // border: '1px solid blue',
                padding: '6px',
                '@media (max-width: 900px)': {
                  display: 'none'
                }
              }}>
              <Aside />
            </Grid>
            <Grid item component="main" md={9} sm={12}
              sx={{
                // border: '1px solid green',
                // padding: '6px',
                // display: 'block'
                // position: 'relative',
                // height: '100%'
              }}>
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
          <Container component="main" maxWidth="xs" sx={{
            // border: '4px solid blue'
          }}>
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
