import React, { useContext, useRef } from 'react'
import PostInput from '../UI/PostInput'
import axios from 'axios'
import GlobalContext from '../../context/GlobalContext'
import { observer } from 'mobx-react-lite'

const WallPostForm = observer(() => {
  const { MainStore, UserStore } = useContext(GlobalContext)
  const description = useRef()

  const sendPost = () => {
    axios({
      url: 'http://192.168.1.5:5000/user/sendPost',
      method: 'post',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      data: {
        description: description.current.innerText
      }
    })
      .then(response => {
        if (response.data.authError === true) {
          MainStore.logout()
        }

        if (response.data.success === false) {
          alert('someone is false')
        } else if (response.data.success === true) {
          UserStore.setUserAttr('posts', [...UserStore.posts, {
            author: UserStore.user.name,
            date: Date.now(),
            content: description.current.innerText,
            id: response.data.postId
          }])

          // let copy = JSON.parse(JSON.stringify(user))
          // setUser({
          //   ...copy,
          //   posts: [...copy.posts, {
          //     author: user.name,
          //     date: Date.now(),
          //     content: description.current.innerText,
          //     id: response.data.postId
          //   }]
          // })
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
})

export default WallPostForm
