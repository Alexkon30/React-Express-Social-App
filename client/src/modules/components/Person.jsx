import React, { useState, useContext } from 'react'
import axios from 'axios'
import GlobalContext from '../context/GlobalContext'
import { Link as ReactLink } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Grid, Button, Typography, Box } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ForumIcon from '@mui/icons-material/Forum';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PetsIcon from '@mui/icons-material/Pets';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#363C42'
    }
  }
});


const Person = observer(({ name, surname, id }) => {
  const { MainStore, UserStore, ClientStore } = useContext(GlobalContext)
  const [isFriend, setIsFriend] = useState(checkFriend(id))

  function checkFriend(id) {
    for (let friend of UserStore.user.friends) {
      if (friend.friendId === id) {
        return true
      }
    }
    return false
  }

  const changeFriends = (manId, action) => {
    // setIsLoad(true)
    let token = localStorage.getItem('token')
    axios({
      url: `http://192.168.1.5:5000/user/friends/`,
      method: 'post',
      headers: { 'Authorization': `Bearer ${token}` },
      data: {
        id,
        action
      }
    })
      .then(response => {
        if (response.data.authError === true) {
          console.log(response.data.message)
          MainStore.logout()
        }
        if (response.data.success === true) {
          if (action === 'add') {
            UserStore.setUserAttr('friends', [...UserStore.user.friends, { name, surname, friendId: manId }])
            setIsFriend(true)
          } else if (action === 'remove') {
            UserStore.setUserAttr('friends', UserStore.user.friends.filter(friend => friend.friendId !== manId))
            setIsFriend(false)
          }
          // setIsLoad(false)
        }
      })
      .catch(err => {
        console.log(err.response.data.message)
        //logout()
      })
  }

  const getClientInfo = () => {
    ClientStore.setClient({
      name,
      surname,
      id
    })
  }

  return (
    <Grid container sx={{
      // border: '1px solid blue',
      p: '10px',
      bgcolor: 'white',
      borderRadius: '6px'
    }}>
      <ThemeProvider theme={theme}>
        <Grid item xs={1} sx={{
          // border: '1px solid red',
          p: '5px',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <Box sx={{
            borderRadius: '50%',
            border: '1px solid silver',
            width: '40px',
            display: 'flex',
            justifyContent: 'center',
            p: '10px'
          }}>
            <PetsIcon />
          </Box>
        </Grid>
        <Grid item xs={7} sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}>
          <ReactLink
            to={`/people/${id}`}
            onClick={getClientInfo}
          >
            <Box>
              <Typography sx={{
                color: '#363C42',
                pl: '40px'
              }}>{name} {surname}</Typography>
            </Box>
          </ReactLink>
        </Grid>
        <Grid item xs={4} sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Button
            // variant='outlined'
            // onClick={() => changeFriends(id, 'remove')}
            size='small'
            sx={{
              mr: '10px',
              color: '#363C42',
              ':hover': {
                border: '2px solid #363C42'
              }
            }}
          >
            <ForumIcon />
          </Button>
          {!isFriend
            ?
            <Button
              variant='contained'
              onClick={() => changeFriends(id, 'add')}
              size='small'
              sx={{
                ':hover': {
                  bgcolor: 'green'
                }
              }}
            >
              <GroupAddIcon />
            </Button>
            :
            <Button
              variant='contained'
              onClick={() => changeFriends(id, 'remove')}
              size='small'
              sx={{
                ':hover': {
                  bgcolor: 'red'
                }
              }}
            >
              <HighlightOffIcon />
            </Button>
          }
        </Grid>
      </ThemeProvider>
    </Grid>
  )
})

export default Person
