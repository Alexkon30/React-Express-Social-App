import React, { useContext } from 'react'
import GlobalContext from '../context/GlobalContext'
import { Box, Typography } from '@mui/material'


function Message(props) {
  const { UserStore } = useContext(GlobalContext)

  let now = new Date(+props.date);
  console.log(now)
  let hours = `${now.getHours()}`.length === 1 ? `0${now.getHours()}` : `${now.getHours()}`;
  let minutes = `${now.getMinutes()}`.length === 1 ? `0${now.getMinutes()}` : `${now.getMinutes()}`;
  let seconds = `${now.getSeconds()}`.length === 1 ? `0${now.getSeconds()}` : `${now.getSeconds()}`;
  let date = `${now.getDate()}`.length === 1 ? `0${now.getDate()}` : `${now.getDate()}`;
  let month = `${now.getMonth()}`.length === 1 ? `0${now.getMonth()}` : `${now.getMonth()}`;
  let year = now.getFullYear();


  return (
    <Box sx={{
      alignSelf: `${props.authorId === UserStore.user.id ? 'flex-end' : 'flex-start'}`,
      m: '5px',
      p: '5px',
      // border: '1px solid red'
      bgcolor: '#F1F2F4',
      borderRadius: '6px',
      maxWidth: '80%',
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        overflowX: 'hidden'
      }}>
        <Typography mr={3}>{props.authorName}</Typography>
        <Typography>{hours}:{minutes}</Typography>
      </Box>
      <Typography>{props.content}</Typography>
    </Box>
  )
}

export default Message
