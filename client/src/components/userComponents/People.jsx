import React, { useContext, useState, useEffect, useMemo } from 'react'
import Loader from './Loader'
import GlobalContext from '../../context/GlobalContext'
import axios from 'axios'
import Person from '../UI/Person'
import { observer } from 'mobx-react-lite'
import { Grid, TextField, InputAdornment, Box, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'


const People = observer(() => {
  const { MainStore } = useContext(GlobalContext)
  const [people, setPeople] = useState([])
  const [searchStr, setSearchStr] = useState('')
  // const [result, setResult] = useState('')

  useEffect(() => {
    usersAxios()
    // eslint-disable-next-line
  }, [])

  const result = useMemo(() =>
    people.filter(person => (person.surname.toLowerCase().startsWith(searchStr.toLowerCase()) || person.name.toLowerCase().startsWith(searchStr.toLowerCase()))),
    [searchStr, people])

  function usersAxios() {
    MainStore.setLoad(true)
    let token = localStorage.getItem('token')

    axios({
      url: 'http://192.168.1.5:5000/user/people/',
      method: 'get',
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then(response => {
        //console.log(response.data)
        if (response.data.authError === true) {
          console.log(response.data.message)
          MainStore.logout()
        }
        MainStore.setLoad(false)
        setPeople(response.data.users)
      })
      .catch(err => {
        console.log(err.response.data.message)
        MainStore.logout() //
      })
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
              placeholder='Find new friends'
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
                ? result.map((person, index) => <Person key={index} {...person} />)
                : <Typography>No matches</Typography>}
            </Box>
          </Grid>
        </Grid>
      }
    </>
  )
})

export default People
