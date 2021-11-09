import React, { useContext } from 'react'
import GlobalContext from '../../context/GlobalContext'
import { Box, Typography } from '@mui/material'


function Message(props) {
  const { UserStore } = useContext(GlobalContext)

  return (
    <Box sx={{
      alignSelf: `${props.authorId === UserStore.user.id ? 'flex-end' : 'flex-start'}`,
      m: '5px',
      p: '5px',
      // border: '1px solid red'
      bgcolor: '#F1F2F4',
      borderRadius: '6px',
      maxWidth: '80%'
    }}>
      <Typography>{props.authorName} {props.date}</Typography>
      <Typography>{props.content}</Typography>
    </Box>
  )
}

export default Message
