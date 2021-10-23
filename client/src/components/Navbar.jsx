import React, { useContext } from 'react'
import { Link as ReactLink } from 'react-router-dom'
import GlobalContext from '../context/GlobalContext'
import { Button } from '@mui/material'
import { observer } from 'mobx-react-lite'

const Navbar = observer(() => {
  const {
    MainStore,
    logout,
  } = useContext(GlobalContext)

  return (
    <div className="navbar">
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
              ? <ReactLink to="/register" onClick={() => MainStore.setMode('register')}>Registration</ReactLink>
              : <ReactLink to="/login" onClick={() => MainStore.setMode('login')}>Login</ReactLink>
            }
          </>
        }
      </div>
    </div>
  )
})

export default Navbar;
