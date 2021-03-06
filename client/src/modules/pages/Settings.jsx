import React, { useEffect, useContext, useState } from 'react'
import Loader from '../utils/Loader'
import axios from 'axios'
import GlobalContext from '../context/GlobalContext'
import { observer } from 'mobx-react-lite'
import { Box, Divider, Grid, TextField, Typography, Button } from '@mui/material'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { Link as ReactLink } from 'react-router-dom'


const Settings = observer(() => {
  const { MainStore, UserStore } = useContext(GlobalContext)
  const [userInfo, setUserInfo] = useState({
    name: '',
    surname: '',
    birthday: '',
    biography: '',
    dateOfRegistration: '',
    phone: '',
    site: '',
    //avatar: ''
  })

  useEffect(() => {
    setUserInfo({
      name: UserStore.user.name,
      surname: UserStore.user.surname,
      birthday: UserStore.user.birthday,
      biography: UserStore.user.biography,
      dateOfRegistration: UserStore.user.dateOfRegistration,
      phone: UserStore.user.phone,
      site: UserStore.user.site
    })
    // eslint-disable-next-line
  }, [])

  const saveInfo = body => {
    MainStore.setLoad(true)
    let token = localStorage.getItem('token')

    axios({
      url: 'http://localhost:5000/user/settings',
      method: 'post',
      headers: { 'Authorization': `Bearer ${token}` },
      data: {
        ...body
      }
    })
      .then(response => {
        if (response.data.authError === true) {
          MainStore.logout()
        }

        if (response.data.success === true) {
          UserStore.setUser({
            ...JSON.parse(JSON.stringify(UserStore.user)),
            ...userInfo
          })
        }
      })
      .catch(err => {
        console.log(err)
        MainStore.logout() //
      })
      .finally(() => {
        MainStore.setLoad(false)
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
          }}>
            <Tabs>
              <TabList>
                <Tab>Main info</Tab>
                <Tab>Contacts</Tab>
              </TabList>
              <TabPanel>
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  {/* name */}
                  <Grid container spacing={1} mt={1}>
                    <Grid item xs={4}
                      display='flex'
                      justifyContent='flex-end'
                      alignItems='center'>
                      <Typography variant='body1' component='span'>Name:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        size='small'
                        fullWidth
                        value={userInfo.name}
                        onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                      ></TextField>
                    </Grid>
                  </Grid>
                  {/* surname */}
                  <Grid container spacing={1} mt={1}>
                    <Grid item xs={4}
                      display='flex'
                      justifyContent='flex-end'
                      alignItems='center'>
                      <Typography variant='body1' component='span'>Surname:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        size='small'
                        fullWidth
                        value={userInfo.surname}
                        onChange={(e) => setUserInfo({ ...userInfo, surname: e.target.value })}
                      ></TextField>
                    </Grid>
                  </Grid>
                  {/* birth */}
                  <Grid container spacing={1} mt={1}>
                    <Grid item xs={4}
                      display='flex'
                      justifyContent='flex-end'
                      alignItems='center'>
                      <Typography variant='body1' component='span'>Birth:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        size='small'
                        type='date'
                        fullWidth
                        value={userInfo.birthday}
                        onChange={(e) => setUserInfo({ ...userInfo, birthday: e.target.value })}
                      ></TextField>
                    </Grid>
                  </Grid>
                  {/* bio */}
                  <Grid container spacing={1} mt={1}>
                    <Grid item xs={4}
                      display='flex'
                      justifyContent='flex-end'
                      alignItems='center'>
                      <Typography variant='body1' component='span'>Hobbies:</Typography>
                    </Grid>
                    <Grid item xs={6} >
                      <TextField
                        size='small'
                        fullWidth
                        multiline
                        placeholder="Your hobbies"
                        minRows={3}
                        value={userInfo.biography}
                        onChange={(e) => setUserInfo({ ...userInfo, biography: e.target.value })}
                      ></TextField>
                    </Grid>
                  </Grid>
                  {/* register */}
                  <Grid container spacing={1} mt={1}>
                    <Grid item xs={4}
                      display='flex'
                      justifyContent='flex-end'
                      alignItems='center'>
                      <Typography variant='body1' component='span'>Date of registration:</Typography>
                    </Grid>
                    <Grid item xs={6} >
                      <Typography>{userInfo.dateOfRegistration}</Typography>
                    </Grid>
                  </Grid>
                  <Box sx={{
                    width: '25%',
                    alignSelf: 'center',
                    mt: '20px',
                    mb: '30px',
                  }}>
                    <ReactLink to='/user'>
                      <Button
                        variant='contained'
                        onClick={() => saveInfo(userInfo)}
                        fullWidth
                        sx={{
                          color: 'white',
                          bgcolor: '#363C42'
                        }}
                      >
                        Save
                      </Button>
                    </ReactLink>
                  </Box>
                  <Divider />
                </Box>
              </TabPanel>
              <TabPanel>
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  {/* phone */}
                  <Grid container spacing={1} mt={1}>
                    <Grid item xs={4}
                      display='flex'
                      justifyContent='flex-end'
                      alignItems='center'>
                      <Typography variant='body1' component='span'>Phone number:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        size='small'
                        fullWidth
                        value={userInfo.phone}
                        onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                      ></TextField>
                    </Grid>
                  </Grid>
                  {/* site */}
                  <Grid container spacing={1} mt={1}>
                    <Grid item xs={4}
                      display='flex'
                      justifyContent='flex-end'
                      alignItems='center'>
                      <Typography variant='body1' component='span'>Site:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        size='small'
                        fullWidth
                        value={userInfo.site}
                        onChange={(e) => setUserInfo({ ...userInfo, site: e.target.value })}
                      ></TextField>
                    </Grid>
                  </Grid>
                  <Box sx={{
                    width: '25%',
                    alignSelf: 'center',
                    mt: '20px',
                    mb: '30px',
                  }}>
                    <ReactLink to='/user'>
                      <Button
                        variant='contained'
                        onClick={() => saveInfo(userInfo)}
                        fullWidth
                        sx={{
                          color: 'white',
                          bgcolor: '#363C42'
                        }}
                      >
                        Save
                      </Button>
                    </ReactLink>
                  </Box>
                  <Divider />
                </Box>
              </TabPanel>
            </Tabs>
          </Grid>
          <Grid item xs={4}>
            {/* tabs */}
          </Grid>
        </Grid>
      }
    </>
  )
})

export default Settings
