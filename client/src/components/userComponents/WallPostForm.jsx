import React, { useContext, useState } from 'react'
import PostInput from '../UI/PostInput'
import axios from 'axios'
import GlobalContext from '../../context/context'

function WallPostForm({ user, setUser }) {
  // console.log(props.user)
  const { logout } = useContext(GlobalContext)
  //const [description, setDescription] = useState('')
  const description = React.useRef()

  const sendPost = () => {
    axios({
      url: 'http://localhost:5000/user/sendPost',
      method: 'post',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      data: {
        description: description.current.innerText
      }
    })
      .then(response => {
        if (response.data.authError === true) {
          logout()
        }

        if (response.data.success === false) {
          alert('someone is false')
        } else if (response.data.success === true) {
          let copy = JSON.parse(JSON.stringify(user))
          setUser({
            ...copy,
            posts: [...copy.posts, {
              author: JSON.parse(localStorage.getItem('userData')).username,
              date: Date.now(),
              content: description.current.innerText,
              id: response.data.postId
            }]
          })
          description.current.innerText = ''
        }
      })
      .catch(err => console.log(err.response))
  }

  return (
    <div className="post__form">
      <div
        contentEditable='true'
        role='textbox'
        aria-multiline='true'
        ref={description}
        placeholder='test'
        // value={description}
        // onChange={(e) => setDescription(e.target.value)}
        className="post__form__field"
      />
      <PostInput
        type="button"
        value="Send post"
        onClick={sendPost}
        className="post__form__btn"
      />
    </div>
  )
}

export default WallPostForm
