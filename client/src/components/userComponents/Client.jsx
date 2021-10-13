import React, { useContext, useEffect } from 'react'
import UserContext from '../../context/UserContext'
import Loader from './Loader'

function Client() {
  const { client, setClient, isLoad } = useContext(UserContext)

  useEffect(() => {
    return () => {
      setClient({
        name: '',
        surname: '',
        id: ''
      })
    }
  })

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
