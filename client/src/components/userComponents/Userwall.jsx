import React, { useContext } from 'react'
import Post from '../UI/Post'
import GlobalContext from '../../context/GlobalContext'
import { observer } from 'mobx-react-lite'
import { Box, Typography } from '@mui/material'

const Userwall = observer(() => {
  const { UserStore } = useContext(GlobalContext)

  return (
    <Box sx={{
      mt: '15px',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      mb: '50px'
    }}>
      {
        UserStore.user.posts.length
          ? UserStore.user.posts.map((post, index) => <Post key={index} {...post} />)
          : <Typography>No posts</Typography>
      }
    </Box>
  )
})

export default Userwall
