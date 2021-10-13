import React, { useContext } from 'react'
import UserContext from '../../context/UserContext'
import Post from '../UI/Post'

function Userwall() {
  const { user } = useContext(UserContext)
  return (
    <div className="user__wall">
      {user.posts.length
        ? user.posts.map((post, index) => <Post key={index} {...post} />)
        : <div>No posts</div>}
    </div>
  )
}

export default Userwall
