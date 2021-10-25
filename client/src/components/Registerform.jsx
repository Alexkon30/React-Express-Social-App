import React, { useContext, useEffect } from 'react';
import GlobalContext from '../context/GlobalContext';
import { Link as ReactLink } from 'react-router-dom';
import { Typography, TextField, Button, Link, Container, Box, FormControlLabel, Checkbox } from '@mui/material'
import { observer } from 'mobx-react-lite';


const Registerform = observer(() => {
  const { MainStore, FormStore, login } = useContext(GlobalContext)

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
          login(response.data.token)
        }
        //добавить логику для отображения ошибок
      })
      .catch(err => console.log(err.response.data.message))
  }

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        border: '1px solid green',
        mt: 10,
        p: 2,
        backgroundColor: 'white',
        borderRadius: 2
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          // border: '1px solid red',
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
        // sx={{ mt: 1 }}
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
        <ReactLink to='/login'>
          <Link variant="body3">
            Already have an account? Sign in
          </Link>
        </ReactLink>
      </Box>
    </Container >
  )
})

export default Registerform;

// eslint-disable-next-line
{/* <div className="registration">
  <div className="registration__header">Registration</div>
  <div className="registration__body">
    <Input
      input={{
        type: "text",
        value: FormStore.username,
        onChange: (e) => FormStore.setAttr('username', e.target.value),
        autoComplete: "off",
        // autoFocus: true
      }}
      label="Username"
      name="user_name"
      className="loginform__body__field"
    />
    <Input
      input={{
        type: "text",
        value: FormStore.email,
        onChange: (e) => FormStore.setAttr('email', e.target.value),
        autoComplete: "off"
      }}
      label="Email"
      name="user_email"
      className="loginform__body__field"
    />
    <Input
      input={{
        type: "password",
        value: FormStore.password,
        onChange: (e) => FormStore.setAttr('password', e.target.value),
      }}
      label="Password"
      name="user_password"
      className="loginform__body__field"
    />
    <Input
      input={{
        type: "password",
        value: FormStore.confirmedPass,
        onChange: (e) => FormStore.setAttr('confirmedPass', e.target.value),
      }}
      label="Confirm password"
      name="user_password_confirm"
      className="loginform__body__field"
    />
    <Input
      input={{
        type: "checkbox",
        value: FormStore.agreement,
        onChange: (e) => FormStore.setAttr('agreement', e.target.value),
      }}
      label="Agree with our terms and policies"
      className="loginform__body__checkbox"
    />
    <button
      disabled={!FormStore.agreement}
      className="registration__btn"
      onClick={() => registerAxios(FormStore.form)}>Register
    </button>
  </div>
  <div className='registration__footer'>
    <div className='registration__footer__text'>Already have an account?</div>
    <Link
      to='/login'
      onClick={() => MainStore.setMode('login')}
    >Login</Link>
  </div>
</div> */}
