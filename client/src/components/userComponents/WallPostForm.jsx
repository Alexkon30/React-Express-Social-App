import React, { useContext, useState } from 'react'
import PostInput from '../UI/PostInput'
import axios from 'axios'
import GlobalContext from '../../context/context'

function WallPostForm(props) {
  // console.log(props.user)
  const { logout } = useContext(GlobalContext)
  const [description, setDescription] = useState('')

  const sendPost = () => {
    console.log('description: ', description)

    axios({
      url: 'http://localhost:5000/user/sendPost',
      method: 'post',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      data: { description }
    })
      .then(response => {
        //console.log(response.data)
        if (response.data.success === false) {
          logout()
        }
        console.log('response: ', response)
        console.log('props.user: ', props.user)

        let copy = JSON.parse(JSON.stringify(props.user))

        //косяк где то тут
        props.setUser({
          ...copy,
          posts: [...copy.posts, {
            author: JSON.parse(localStorage.getItem('user')).userName,
            date: Date.now(), //now на клиенте и на сервере будут отличаться
            content: description
          }]
        })

        //TODO
      })
      .catch(err => console.log(err.response))
  }

  return (
    <div className="post__form">
      <PostInput
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        autoComplete="off"
        className="loginform__body__field"
      />
      <PostInput
        type="button"
        value="Send post"
        onClick={sendPost}
      />
    </div>
  )
}

export default WallPostForm
