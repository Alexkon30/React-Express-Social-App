import React, { useContext } from 'react'
import Loader from './Loader'
import Friend from '../UI/Friend'
import { Link } from 'react-router-dom'
import GlobalContext from '../../context/GlobalContext'
import { observer } from 'mobx-react-lite'

const Friends = observer(() => {
  const { MainStore, UserStore } = useContext(GlobalContext)

  return (
    // <div className="content">
    <>
      {MainStore.isLoad ?
        <Loader />
        : <>
          <div className="search">
            search..
          </div>
          <div className="friends__list">
            {UserStore.user.friends.length
              ? UserStore.user.friends.map((friend, index) => <Friend key={index} {...friend} id={friend.friendId} />)
              : <>
                <div>No friends</div>
                <Link to='/people'>Find new friends</Link>
              </>}
          </div>
        </>
      }
    </>
    // </div>
  )
})

export default Friends
