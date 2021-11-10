import React, { useContext, useState, useMemo } from 'react'
import Loader from '../utils/Loader'
import Friend from '../components/Friend'
import GlobalContext from '../context/GlobalContext'
import { observer } from 'mobx-react-lite'
import { Grid, Box, Typography, TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const Friends = observer(() => {
  const { MainStore, UserStore } = useContext(GlobalContext)
  const [searchStr, setSearchStr] = useState('')

  const result = useMemo(() =>
    UserStore.user.friends.filter(person => (person.surname.toLowerCase().startsWith(searchStr.toLowerCase()) || person.name.toLowerCase().startsWith(searchStr.toLowerCase()))),
    [searchStr, UserStore.user.friends])



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
              placeholder='Find in friends'
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
              {result.length
                ? result.map((person, index) => <Friend key={index} {...person} />)
                : <Typography>No matches</Typography>}
            </Box>
          </Grid>
        </Grid>
      }
    </>
  )
})

export default Friends
