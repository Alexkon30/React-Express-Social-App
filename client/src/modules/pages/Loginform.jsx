import React, { useContext, useEffect } from 'react'
import GlobalContext from '../context/GlobalContext'
import axios from 'axios'
import { Link as ReactLink } from 'react-router-dom'
import { Typography, TextField, Button, Link, Box, } from '@mui/material'
import { observer } from 'mobx-react-lite'

const Loginform = observer(() => {

  const { MainStore, FormStore } = useContext(GlobalContext)

  const loginAxios = body => {
    axios.post('http://192.168.1.5:5000/login', body)
      .then(response => {
        if (response.data.success) {
          MainStore.login(response.data.token, JSON.stringify({ username: response.data.username }))
        }
      })
      .catch(err => console.log(err, err.message))
  }

  useEffect(() => {
    FormStore.setForm({
      username: '',
      email: '',
      password: '',
      confirmedPass: '',
      agreement: false
    });
    // eslint-disable-next-line
  }, []);


  return (
    <Box
      component="form"
      onSubmit={() => loginAxios({ ...FormStore.form })}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // border: '1px solid red',
      }}
    >
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <TextField
        margin="normal"
        fullWidth
        label="Email Address"
        value={FormStore.form.email}
        onChange={(e) => FormStore.setAttr('email', e.target.value)}
        autoComplete="email"
      />
      <TextField
        margin="normal"
        fullWidth
        label="Password"
        type="password"
        value={FormStore.form.password}
        onChange={(e) => FormStore.setAttr('password', e.target.value)}
      />
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={() => loginAxios({ ...FormStore.form })}
      >
        Sign In
      </Button>
      <ReactLink to='/register' onClick={() => MainStore.setMode('register')}>
        <Link variant="body3">
          "Don't have an account? Sign Up"
        </Link>
      </ReactLink>
    </Box>
  )
})

export default Loginform;


