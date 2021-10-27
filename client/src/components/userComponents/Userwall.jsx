import React, { useContext } from 'react'
import Post from '../UI/Post'
import GlobalContext from '../../context/GlobalContext'
import { observer } from 'mobx-react-lite'

const Userwall = observer(() => {
  const { UserStore } = useContext(GlobalContext)
  return (
    <div className="user__wall">
      {UserStore.user.posts.length
        ? UserStore.user.posts.map((post, index) => <Post key={index} {...post} />)
        : <div>No posts</div>}
    </div>
  )
})

export default Userwall
