import React from 'react'
import UserContext from '../../context/UserContext'
import axios from 'axios'

function Post(props) {
  const rating = React.useState({
    likes: 0,
    dislikes: 0
  })


  const { user, setUser } = React.useContext(UserContext)

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
          alert(response.data.message)
          //logout()
        } else if (response.data.success === true) {
          setUser({
            ...JSON.parse(JSON.stringify(user)),
            posts: user.posts.filter(post => post.id !== props.id)
          })
          alert(response.data.message)
        }
      })
      .catch(err => console.log(err.response))
  }

  return (
    <div className="post" data-post-id={props.id}>
      <div className="post__header">
        <div className="post__author">
          {props.author}
        </div>
        <div className="post__date">
          {`${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} ${date.getHours()}:${minutes}`}
        </div>
        <div className="post__remove" onClick={() => removePost()}>
          X
        </div>
      </div>
      <hr />
      <div className="post__content">
        {props.content}
      </div>
      <hr />
      <div className="post__footer">
        <div className="likes">Like</div> /
        <div className="dislikes">Dislike</div>
      </div>
    </div>
  )
}

export default Post
