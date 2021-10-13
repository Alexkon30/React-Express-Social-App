import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../context/UserContext'

function Friend(props) {
  const { user, setUser, setIsLoad, setClient } = useContext(UserContext)

  const getClientInfo = () => {
    setClient({
      name: props.name,
      surname: props.surname,
      id: props.id
    })
  }

  return (
    <div className="person">
      <div className="person__photo">
        photo
      </div>
      <Link
        className="person__info"
        to={`/people/${props.id}`}
        onClick={getClientInfo}
      >
        {props.name} {props.surname}
      </Link>
    </div>
  )
}

export default Friend
