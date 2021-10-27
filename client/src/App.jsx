import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
// import { useAuth } from './hooks/auth.hook'
import GlobalContext from './context/GlobalContext'
import Routes from './routes'
import './styles/App.css'
import Navbar from './components/Navbar'
import MainStore from './store/mainStore.js'
import { observer } from 'mobx-react-lite'
import { Box } from '@mui/material'

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
        <Box sx={{
          // border: '3px solid red',
          backgroundColor: 'white',
          minHeight: '100vh'
        }}>
          <Navbar />
          <Routes />
        </Box>
      </Router>
    </GlobalContext.Provider >
  );
})

export default App;
