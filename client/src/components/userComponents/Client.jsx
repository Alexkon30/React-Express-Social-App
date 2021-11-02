import React, { useContext } from 'react'
import GlobalContext from '../../context/GlobalContext'
import Loader from './Loader'
import { observer } from 'mobx-react-lite'

const Client = observer(() => {
  const { MainStore, ClientStore } = useContext(GlobalContext)


  return (
    // <div className="content">
    <>
      {MainStore.isLoad
        ? <Loader />
        : <div>
          {ClientStore.client.name} {ClientStore.client.surname}
        </div>
      }
    </>
    // </div>
  )
})

export default Client
