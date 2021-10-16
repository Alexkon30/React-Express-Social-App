import React, { useContext } from 'react'
import UserContext from '../../context/UserContext'
import Loader from './Loader'

function Client() {
  const { client, isLoad } = useContext(UserContext)


  return (
    <div className="content">
      {isLoad
        ? <Loader />
        : <div>
          {client.name} {client.surname}
        </div>
      }
    </div>
  )
}

export default Client
