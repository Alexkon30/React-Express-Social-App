import React, { useContext } from 'react'
import { Link as ReactLink } from 'react-router-dom'
import GlobalContext from '../context/GlobalContext'
import { Box, Button, Link, Avatar, AppBar, Toolbar, Grid, Container } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#363C42',
    }
  }
});

const Navbar = observer(() => {
  const { MainStore } = useContext(GlobalContext)

  return (
    <ThemeProvider theme={theme}>
      <Grid item>
        <AppBar position='static' color='primary'>
          <Container maxWidth='xl'>
            <Toolbar >
              < Link href="/">
                <Avatar src="logo_2.png" alt="logo" sx={{
                  height: '75px',
                  width: '75px',
                  borderRadius: '50%',
                }} />
              </Link>
              <Box marginLeft='auto'>
                {MainStore.isAuth
                  ?
                  <ReactLink to="/login" onClick={() => MainStore.logout()}>
                    <Button variant='contained'>
                      Logout
                    </Button>
                  </ReactLink>
                  :
                  <>
                    {MainStore.mode === 'login'
                      ?
                      <ReactLink to="/register" onClick={() => MainStore.setMode('register')}>
                        <Button variant='contained'>
                          Sign Up
                        </Button>
                      </ReactLink>
                      :
                      <ReactLink to="/login" onClick={() => MainStore.setMode('login')}>
                        <Button variant='contained'>
                          Sign In
                        </Button>
                      </ReactLink>
                    }
                  </>
                }
              </Box>
            </Toolbar>
          </Container>
        </AppBar >
      </Grid>
    </ThemeProvider>
  )
})

export default Navbar;
