import React from 'react'
import GlobalContext from '../../context/context'
import axios from 'axios'
import Loader from './Loader'
import Dialog from '../UI/Dialog'

function Friends() {
  const { logout } = React.useContext(GlobalContext)
  const [isLoad, setIsLoad] = React.useState(false)
  const [dialogues, setDialogues] = React.useState([])

  React.useEffect(() => {
    dialoguesAxios()
  }, [])

  const dialoguesAxios = () => {
    setIsLoad(true)
    let token = localStorage.getItem('token')

    axios({
      url: 'http://localhost:5000/user/dialogues/',
      method: 'get',
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then(response => {
        //console.log(response.data)
        if (response.data.authError === true) {
          console.log(response.data.message)
          logout()
        }
        setDialogues(response.data.dialogues)
        setInterval(() => {
          setIsLoad(false)
        }, 500)
      })
      .catch(err => {
        console.log(err.response.data.message)
        //logout()
      })
  }



  return (
    <div className="content">
      {isLoad ?
        <Loader />
        : <>
          <div className="search">
            search..
          </div>
          <div className="friends__list">
            {dialogues.length
              ? dialogues.map((dialog, index) => <Dialog key={index} {...dialog} />)
              : <div>No dialogues</div>}
          </div>
        </>
      }
    </div>
  )
}

export default Friends
