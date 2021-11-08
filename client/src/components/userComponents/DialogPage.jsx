import React, { useContext, useState, useRef, useEffect } from 'react'
import { Link as ReactLink } from 'react-router-dom'
import GlobalContext from '../../context/GlobalContext'
import Message from '../UI/Message'
import Loader from './Loader'
import { observer } from 'mobx-react-lite'
import { Grid, Typography, Box, TextField, Button } from '@mui/material'
import PetsIcon from '@mui/icons-material/Pets'


const DialogPage = observer(() => {
  const { MainStore, UserStore, ClientStore, socket } = useContext(GlobalContext)
  const [messageText, setMessageText] = useState('')
  const socketRef = useRef(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    socketRef.current = socket

    socketRef.current.on('message', msg => {
      // console.log('msg action')
      if (msg.action === 'new dialog message' && msg.dialogId === ClientStore.client.dialogId) {
        // console.log('in action')
        MainStore.addMessage({
          content: msg.content,
          date: msg.date,
          authorName: msg.authorName,
          authorId: msg.authorId,
          id: msg.id
        })

        messagesEndRef.current?.scrollIntoView({
          behavior: 'smooth'
        })
      }
    })

    return () => {
      // при размонтировании компонента выполняем отключение сокета
      socketRef.current.disconnect()
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    })
  }, [MainStore.messages])


  const sendMessage = (content, from, to) => {
    console.log('send')
    socketRef.current.send({
      action: 'send',
      content,
      from,
      to
    });
    setMessageText('')
  }

  return (
    <Grid container sx={{
      height: '100%',
      // border: '1px solid red',
    }}>
      <Grid item xs={8} sx={{
        // border: '1px solid red',
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        flexDirection: 'column',
        '& .MuiBox-root + *': {
          mt: '10px'
        },
        maxHeight: '86vh',
        minHeight: '500px'
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
          // height: '57vh',
          overflowY: 'auto',
          bgcolor: 'white',
          borderRadius: '5px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          p: '10px'
        }}>
          {MainStore.isLoad
            ? <Loader />
            : <>
              {MainStore.messages.length
                ? MainStore.messages.map((message, index) => <Message key={index} {...message} />)
                : <Typography>No messages</Typography>
              }
              <span ref={messagesEndRef}></span>
            </>
          }
        </Box>
        {/* Messages */}

        {/* Footer */}
        <Box sx={{
          // border: '1px solid yellow',
          textAlign: 'center',
          p: '25px',
          bgcolor: 'white',
          borderRadius: '5px',
          mb: '15px'
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
