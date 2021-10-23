import React, { useContext, useEffect } from 'react'
import GlobalContext from '../context/GlobalContext'
import Formfooter from './UI/Formfooter'
import Input from './UI/Input'
import axios from 'axios'
import { Link as ReactLink } from 'react-router-dom'
import { TextField, Button, Container, Typography, Grid, Box, Link } from '@mui/material/'

function Loginform() {

  const { form, setForm, setMode, login } = useContext(GlobalContext)

  const loginAxios = body => {
    axios.post('http://localhost:5000/login', body)
      .then(response => {
        // console.log(response)
        if (response.data.success) {
          login(response.data.token, JSON.stringify({ username: response.data.username }))
        }
      })
      .catch(err => console.log(err))
  }

  // useEffect(() => {
  //   setMode('login');
  //   setForm({
  //     username: '',
  //     email: '',
  //     password: '',
  //     confirmedPass: '',
  //     agreement: false
  //   });
  //   // eslint-disable-next-line
  // }, []);


  return (
    <Grid container
      direction='column'
      spacing={2}
      alignItems='stretch'
      sx={{
        borderRadius: '6px',
        background: 'white',
        width: '450px',
        padding: '16px',
        mt: '-120px'
      }}
    >
      <Grid item
      >
        <Typography
          sx={{
            width: '100%',
            textAlign: 'center'
          }}>Log In</Typography>
      </Grid>
      <Grid item>
        <TextField
          label="Login"
          variant='outlined'
          sx={{
            width: '100%'
          }}
        />
      </Grid>
      <Grid item>
        <TextField
          label="Password"
          type="password"
          variant='outlined'
          sx={{
            width: '100%'
          }}
        />
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          sx={{
            width: '100%'
          }}
        >Log In</Button>
      </Grid>
      <Grid item
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <Typography noWrap>Don't have an account?</Typography>
        <ReactLink to='/register'>
          <Link underline='hover'>Registration</Link>
        </ReactLink>
      </Grid>
    </Grid >
  )
}

export default Loginform;

// eslint-disable-next-line no-lone-blocks
{/* <div className="loginform">
  <div className="loginform__header">Login</div>
  <div className="loginform__body">
    <Input
      input={{
        type: "text",
        value: form.email,
        onChange: (e) => setForm({ ...form, email: e.target.value }),
        autoComplete: "off",
      }}
      label="Email"
      name="user_email"
      className="loginform__body__field"
    />
    <Input
      input={{
        type: "password",
        value: form.password,
        onChange: (e) => setForm({ ...form, password: e.target.value })
      }}
      label="Password"
      name="user_password"
      className="loginform__body__field"

    />
    <button className="loginform__btn" onClick={() => loginAxios(form)}>Login</button>
  </div>
  <Formfooter
    block="loginform"
    text="Don't have an account?"
    href="/register"
    linkText="Registration"
  />
</div> */}

// eslint-disable-next-line no-lone-blocks
{/* <FormControlLabel
  control={<Checkbox
    color="default" />}
  label="Label" /> */}

