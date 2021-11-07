import React, { useContext, useEffect, useState } from 'react'
import Loader from './Loader'
import Dialog from '../UI/Dialog'
import GlobalContext from '../../context/GlobalContext'
import { observer } from 'mobx-react-lite'
import { Box, Grid, TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'


const Messenger = observer(() => {
  const { MainStore, UserStore, ClientStore } = useContext(GlobalContext)
  const [searchStr, setSearchStr] = useState('')


  useEffect(() => {
    return () => {
      MainStore.setLoad(false)
    }
    // eslint-disable-next-line
  }, [])

  const setPartner = dialog => {
    MainStore.setLoad(true)
    ClientStore.setClient({ ...dialog, id: dialog.partnerId })

    //загрузить сообщения 
    fetch(`http://192.168.1.5:5000/messenger/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        partnerId: dialog.partnerId
      })
    })
      .then(result => result.json())
      .then(response => {
        console.log(response)
        if (response.success === 'true') {
          MainStore.setMessages(response.messages)
        }
      })
      .catch(err => console.log(err))
    MainStore.setLoad(false)
  }

  return (
    <>
      {MainStore.isLoad
        ? <Loader />
        :
        <Grid container>
          <Grid item xs={8} pl={2} pr={2} sx={{
            // border: '1px solid blue',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <TextField
              placeholder='Find in dialogs'
              sx={{
                width: '75%',
                mb: '15px',
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              variant="standard"
              value={searchStr}
              onChange={(e) => {
                setSearchStr(e.target.value)
              }}
            />
            <Box sx={{
              width: '100%',
              // border: '1px solid red',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              {UserStore.user.dialogues.length
                ? UserStore.user.dialogues.map(dialog => <Dialog
                  key={dialog.dialogId}
                  onClick={() => setPartner(dialog)}
                  {...dialog} />)
                : <div>No dialogues</div>}
            </Box>
          </Grid>
        </Grid>
      }
    </>
  )
})

export default Messenger
