import React, { useContext, useEffect } from 'react'
import GlobalContext from '../context/GlobalContext'
import axios from 'axios'
import { Link as ReactLink } from 'react-router-dom'
import { Typography, TextField, Button, Link, Container, Box, FormControlLabel, Checkbox } from '@mui/material'
import { observer } from 'mobx-react-lite'

const Loginform = observer(() => {

  const { MainStore, FormStore, login } = useContext(GlobalContext)

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
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        // border: '1px solid green',
        mt: 10,
        p: 3,
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
          Sign in
        </Typography>
        <Box component="form"
          onSubmit={() => loginAxios(FormStore.form)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            fullWidth
            label="Email Address"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
        <ReactLink to='/register'>
          <Link variant="body3">
            {"Don't have an account? Sign Up"}
          </Link>
        </ReactLink>
      </Box>
    </Container >
  )
})

export default Loginform;

// eslint-disable-next-line no-lone-blocks
{/* <FormControlLabel
  control={<Checkbox
    color="default" />}
  label="Label" /> */}

