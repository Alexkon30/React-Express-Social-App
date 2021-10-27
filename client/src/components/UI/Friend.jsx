import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import GlobalContext from '../../context/GlobalContext'
import { observer } from 'mobx-react-lite'


const Friend = observer((props) => {
  const { ClientStore } = useContext(GlobalContext)

  const getClientInfo = () => {
    ClientStore.setClient({
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
})

export default Friend
