import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Grid } from '@mui/material'

import socket from './modules/utils/socket'
import GlobalContext from './modules/context/GlobalContext'
import Routes from './modules/utils/Routes'
import Navbar from './modules/components/Navbar'
import MainStore from './store/mainStore.js'
import './styles/App.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#363C42',
    }
  }
});

const mainStore = new MainStore();

const App = observer(() => {

  useEffect(() => {
    mainStore.checkToken()
  }, [])

  return (
    <GlobalContext.Provider value={{
      MainStore: mainStore,
      FormStore: mainStore.FormStore,
      ClientStore: mainStore.ClientStore,
      UserStore: mainStore.UserStore,
      socket
    }}>
      <Router>
        <ThemeProvider theme={theme}>
          <Grid container
            direction='column'
            sx={{
              // border: '3px solid red',
              minHeight: '100vh',
              minWidth: '320px',
              bgcolor: '#F1F2F4',
            }}>
            <Navbar />
            <Routes />
          </Grid>
        </ThemeProvider>
      </Router>
    </GlobalContext.Provider >
  );
})

export default App;
