import React, { useContext } from 'react'
import axios from 'axios'
import GlobalContext from '../context/GlobalContext'
import { observer } from 'mobx-react-lite'
import { Box, Divider, Typography } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';


const Post = observer((props) => {
  // const rating = React.useState({
  //   likes: 0,
  //   dislikes: 0
  // })

  const { MainStore, UserStore } = useContext(GlobalContext)

  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  let date = new Date(+props.date);
  let minutes = date.getMinutes().toString().length === 2 ? date.getMinutes() : `0${date.getMinutes()}`;

  const removePost = () => {
    axios({
      url: 'http://localhost:5000/user/deletePost',
      method: 'post',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      data: {
        postId: props.id
      }
    })
      .then(response => {
        if (response.data.success === false) {
          //alert(response.data.message)
          MainStore.logout()
        } else if (response.data.success === true) {
          UserStore.deletePostById(props.id)
          alert(response.data.message)
        }
      })
      .catch(err => console.log(err.response))
  }

  return (
    <Box sx={{
      bgcolor: 'white',
      p: '15px',
      borderRadius: '8px'
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <Typography>{props.author}</Typography>
        <Typography>{`${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} ${date.getHours()}:${minutes}`}</Typography>
        <Typography onClick={removePost}>
          <ClearIcon sx={{
            ':hover': {
              cursor: 'pointer',
              color: 'red'
            }
          }} />
        </Typography>
      </Box>
      <Divider />
      <Typography>{props.content}</Typography>
      <Divider />
      {/* <Typography>likes / dislikes</Typography> */}
    </Box>
  )
})

export default Post
