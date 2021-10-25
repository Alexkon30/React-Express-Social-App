import React, { useContext } from 'react'
import { Link as ReactLink } from 'react-router-dom'
import GlobalContext from '../context/GlobalContext'
import { AppBar, Button, Container, Toolbar } from '@mui/material'
import { observer } from 'mobx-react-lite'

const Navbar = observer(() => {
  const { MainStore, logout } = useContext(GlobalContext)

  return (
    <AppBar position='fixed'>
      <Container fixed>
        <Toolbar>

        </Toolbar>
      </Container>
    </AppBar>
  )
})

export default Navbar;

{/* <div className="navbar">
  <div className="navbar__logo">
    <a href="/">
      <img src="logo_2.png" alt="logo" />
    </a>
  </div>
  <div className="navbar__btn">
    {MainStore.isAuth
      ? <ReactLink to="/login" onClick={logout}>Logout</ReactLink>
      : <>
        {MainStore.mode === 'login'
          ? <ReactLink to="/register" onClick={() => MainStore.setMode('register')}>Sign Up</ReactLink>
          : <ReactLink to="/login" onClick={() => MainStore.setMode('login')}>Sign In</ReactLink>
        }
      </>
    }
  </div>
</div> */}
