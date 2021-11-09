import React, { useContext } from 'react'
import GlobalContext from '../../context/GlobalContext'
import Loader from './Loader'
import { observer } from 'mobx-react-lite'

const Client = observer(() => {
  const { MainStore, ClientStore } = useContext(GlobalContext)


  return (
    <>
      {MainStore.isLoad
        ? <Loader />
        : <div>
          {ClientStore.client.name} {ClientStore.client.surname}
        </div>
      }
    </>
  )
})

export default Client
