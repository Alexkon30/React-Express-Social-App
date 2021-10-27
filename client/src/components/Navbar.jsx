import React, { useContext } from 'react'
import { Link as ReactLink } from 'react-router-dom'
import GlobalContext from '../context/GlobalContext'
import { Button, Link, Avatar, AppBar, Toolbar } from '@mui/material'
import { observer } from 'mobx-react-lite'

const Navbar = observer(() => {
  const { MainStore } = useContext(GlobalContext)

  return (
    <AppBar sx={{
      position: 'static',
    }}>
      <Toolbar>
        < Link href="/" marginRight='auto'>
          <Avatar src="logo_2.png" alt="logo" sx={{
            height: '75px',
            width: '75px',
            borderRadius: '50%',
          }} />
        </Link>
        {MainStore.isAuth
          ?
          <Button variant='contained' >
            <ReactLink to="/login" onClick={() => MainStore.logout()}>
              Logout
            </ReactLink>
          </Button>
          : <>
            {MainStore.mode === 'login'
              ?
              <Button variant='contained'>
                <ReactLink to="/register" onClick={() => MainStore.setMode('register')}>
                  Sign Up
                </ReactLink>
              </Button>
              :
              <Button variant='contained' >
                <ReactLink to="/login" onClick={() => MainStore.setMode('login')}>
                  Sign In
                </ReactLink>
              </Button>
            }
          </>
        }
      </Toolbar>
    </AppBar >
  )
})

export default Navbar;
