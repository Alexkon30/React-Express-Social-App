import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useAuth } from './hooks/auth.hook'
import GlobalContext from './context/GlobalContext'
import useRoutes from './routes'
import './styles/App.css'
import Navbar from './components/Navbar'
import { Grid } from '@mui/material'

import MainStore from './store/mainStore.js'
import { observer } from 'mobx-react-lite'

const App = observer(() => {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmedPass: '',
    agreement: false
  })
  const { login, logout, token } = useAuth();

  const isAuth = !!token;
  const routes = useRoutes(isAuth);

  const [user, setUser] = useState({
    id: '',
    name: '',
    surname: '',
    biography: '',
    birthday: '',
    dateOfRegistration: '',
    dialogues: [],
    posts: [],
    friends: []
  });
  const [client, setClient] = useState({
    name: '',
    surname: '',
    id: ''
  })
  const [isLoad, setIsLoad] = useState(false)
  const [messages, setMessages] = useState([])

  return (
    <GlobalContext.Provider value={{
      form, setForm,
      login, logout, token,
      user, setUser, isLoad, setIsLoad, client, setClient, messages, setMessages,
      MainStore
      // userId,
    }}>
      <Router>
        <Grid
          container
          justifyContent='flex-start'
          alignItems='stretch'
          direction='column'
          minHeight='100vh'
        >
          <Grid item
          // border='2px solid green'
          >
            <Navbar />
          </Grid>
          <Grid item
            // border='2px solid red'
            display='grid'
            justifyContent='center'
            xs
            alignItems='center'
            sx={{
              background: '#66A3D2'
            }}
          >
            {routes}
          </Grid>
        </Grid>
      </Router>
    </GlobalContext.Provider>
  );
})

export default App;
