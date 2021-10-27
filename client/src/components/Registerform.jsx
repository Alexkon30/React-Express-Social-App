import React, { useContext, useEffect } from 'react';
import GlobalContext from '../context/GlobalContext';
import { Link as ReactLink } from 'react-router-dom';
import { Typography, TextField, Button, Link, Box, FormControlLabel, Checkbox } from '@mui/material'
import { observer } from 'mobx-react-lite';


const Registerform = observer(() => {
  const { MainStore, FormStore } = useContext(GlobalContext)

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

  const registerFetch = (body) => {
    fetch('http://localhost:5000/register', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(response => {
        if (response.data.success) {
          MainStore.login(response.data.token)
        }
        //добавить логику для отображения ошибок
      })
      .catch(err => console.log(err.response.data.message))
  }

  return (
    <Box
      component="form"
      onSubmit={() => registerFetch({ ...FormStore.form })}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <TextField
        margin="normal"
        fullWidth
        label="Username"
        value={FormStore.form.username}
        onChange={(e) => FormStore.setAttr('username', e.target.value)}
      />
      <TextField
        margin="normal"
        fullWidth
        label="Email Address"
        autoComplete="email"
        value={FormStore.form.email}
        onChange={(e) => FormStore.setAttr('email', e.target.value)}
      />
      <TextField
        margin="normal"
        fullWidth
        label="Password"
        type="password"
        value={FormStore.form.password}
        onChange={(e) => FormStore.setAttr('password', e.target.value)}
      />
      <TextField
        margin="normal"
        fullWidth
        label="Confirm password"
        type="password"
        value={FormStore.form.confirmedPass}
        onChange={(e) => FormStore.setAttr('confirmedPass', e.target.value)}
      />
      <FormControlLabel
        control={<Checkbox
          onChange={(e) => {
            FormStore.setAttr('agreement', e.target.checked)
          }}
          color="default"
        />}
        label="Agree with our terms and policies"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={!FormStore.form.agreement}
        sx={{ mt: 3, mb: 2 }}
        onClick={() => console.log({ ...FormStore.form })}
      >
        Sign Up
      </Button>
      <ReactLink to='/login' onClick={() => MainStore.setMode('login')}>
        <Link variant="body3">
          Already have an account? Sign in
        </Link>
      </ReactLink>
    </Box>
  )
})

export default Registerform;
