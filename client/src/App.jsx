import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
// import { useAuth } from './hooks/auth.hook'
import GlobalContext from './context/GlobalContext'
import Routes from './routes'
import './styles/App.css'
import Navbar from './components/Navbar'
import MainStore from './store/mainStore.js'
import { observer } from 'mobx-react-lite'
import { Box, Grid } from '@mui/material'

const App = observer(() => {
  // const { login, logout, token } = useAuth();

  useEffect(() => {
    MainStore.checkToken()
  }, [])

  return (
    <GlobalContext.Provider value={{
      MainStore,
      FormStore: MainStore.FormStore,
      ClientStore: MainStore.ClientStore,
      UserStore: MainStore.UserStore,
    }}>
      <Router>
        <Grid container
          direction='column'
          sx={{
            // border: '3px solid red',
            minHeight: '100vh',
            minWidth: '400px',
            // gridTemplateRows: 'auto 1fr',
          }}>
          <Navbar />
          <Routes />
        </Grid>
      </Router>
    </GlobalContext.Provider >
  );
})

export default App;
