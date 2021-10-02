import React from 'react'
import Post from '../UI/Post'

function Userwall(props) {
  return (
    <div className="user__wall">
      {props.posts.length
        ? props.posts.map((post, index) => <Post key={index} {...post} />)
        : <div>No posts</div>}
    </div>
  )
}

export default Userwall
