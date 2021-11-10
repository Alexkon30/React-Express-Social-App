import React, { useContext, useState } from 'react'
import axios from 'axios'
import GlobalContext from '../context/GlobalContext'
import { observer } from 'mobx-react-lite'
import { Box, Grid, TextField, Button } from '@mui/material'

const WallPostForm = observer(() => {
  const { MainStore, UserStore } = useContext(GlobalContext)
  const [postContent, setPostContent] = useState('')

  const sendPost = (description) => {
    axios({
      url: 'http://192.168.1.5:5000/user/sendPost',
      method: 'post',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      data: {
        description
      }
    })
      .then(response => {
        if (response.data.authError === true) {
          MainStore.logout()
        }

        if (response.data.success === false) {
          alert('someone is false')
        } else if (response.data.success === true) {
          console.log('success')
          UserStore.addPost({
            author: UserStore.user.name,
            date: Date.now(),
            content: description,
            id: response.data.postId
          })

          setPostContent('')
        }
      })
      .catch(err => console.log(err.response))
  }

  return (
    <Box sx={{
      mt: '30px',
      bgcolor: 'white',
      p: '20px',
      borderRadius: '6px',
    }}>
      <Grid container spacing={1} sx={{
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Grid item xs={10}>
          <TextField
            size='small'
            fullWidth
            multiline
            placeholder="What's new?"
            minRows={1}
            value={postContent}
            onChange={((e) => setPostContent(e.target.value))}
          ></TextField>
        </Grid>
        <Grid item xs={2} fullWidth>
          <Button variant='outlined' onClick={() => sendPost(postContent)}>Send</Button>
        </Grid>
      </Grid>
    </Box>

  )
})

export default WallPostForm
