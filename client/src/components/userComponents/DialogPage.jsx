import React, { useContext, useState, useCallback } from 'react'
import { Link as ReactLink } from 'react-router-dom'
import GlobalContext from '../../context/GlobalContext'
import Message from '../UI/Message'
// import Loader from './Loader'
import socket from '../../socket'
import { observer } from 'mobx-react-lite'
import { Grid, Typography, Box, TextField, Button } from '@mui/material'
import PetsIcon from '@mui/icons-material/Pets';


const DialogPage = observer(() => {
  const { MainStore, UserStore, ClientStore } = useContext(GlobalContext)
  const [messageText, setMessageText] = useState('')
  const [localMessages, setMessages] = useState([])

  // useEffect(() => {
  //   console.log('new message')
  //   // setMessages(MainStore.messages)
  // }, [localMessages])


  const sendMessage = useCallback((content, from, to) => {
    console.log('send')
    socket.send({
      action: 'send',
      content,
      from,
      to
    });
    // setMessages([...localMessages, {
    //   action: 'send',
    //   content,
    //   from,
    //   to
    // }])
    // eslint-disable-next-line
  }, [localMessages])

  socket.on('message', msg => {
    if (msg.action === 'new dialog message' && msg.dialogId === ClientStore.client.dialogId) {
      MainStore.addMessage({
        content: msg.content,
        date: msg.date,
        author: msg.author,
        id: msg.id
      })
    }
  })

  return (
    <Grid container sx={{
      height: '100%',
      pb: '10px'
    }}>
      <Grid item xs={8} sx={{
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'column',
        '& .MuiBox-root + *': {
          mt: '10px'
        }
      }}>

        {/* Header */}
        <Box sx={{
          // border: '1px solid yellow',
          bgcolor: 'white',
          borderRadius: '5px',
          p: '10px',
          textAlign: 'center'
        }}>
          <ReactLink
            to={`/people/${ClientStore.client.id}`}
          >
            <Box>
              <Typography sx={{
                color: '#363C42',
                pl: '40px'
              }}>{ClientStore.client.name} {ClientStore.client.surname}</Typography>
            </Box>
          </ReactLink>
        </Box>
        {/* Header */}

        {/* Messages */}
        <Box sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'stretch',
          overflowY: 'auto',
          bgcolor: 'white',
          borderRadius: '5px'
        }}>
          {MainStore.messages.length
            ? MainStore.messages.map((message, index) => <Message key={index} {...message} />)
            : <Typography>No messages</Typography>
          }
        </Box>
        {/* Messages */}

        {/* Footer */}
        <Box sx={{
          // border: '1px solid yellow',
          textAlign: 'center',
          p: '25px',
          bgcolor: 'white',
          borderRadius: '5px'
        }}>
          <TextField
            size='small'
            multiline
            placeholder='Write message...'
            maxRows={4}
            value={messageText}
            onChange={(e) => {
              setMessageText(e.target.value)
            }}
            sx={{
              width: '75%',
              mr: '10px',
            }}>
          </TextField>
          <Button
            variant='contained'
            onClick={() => sendMessage(messageText, UserStore.user.id, ClientStore.client.id)}
          >
            <PetsIcon />
          </Button>
        </Box>
        {/* Footer */}

      </Grid>

      <Grid item xs={4} sx={{
        // border: '1px solid blue',
      }}></Grid>
    </Grid>
  )
})

export default DialogPage
