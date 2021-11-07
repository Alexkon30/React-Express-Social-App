import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import GlobalContext from './context/GlobalContext'
import Routes from './routes'
import './styles/App.css'
import Navbar from './components/Navbar'
import MainStore from './store/mainStore.js'
import { observer } from 'mobx-react-lite'
import { Grid } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
    }}>
      <Router>
        <ThemeProvider theme={theme}>
          <Grid container
            direction='column'
            sx={{
              // border: '3px solid red',
              minHeight: '100vh',
              minWidth: '320px',
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
