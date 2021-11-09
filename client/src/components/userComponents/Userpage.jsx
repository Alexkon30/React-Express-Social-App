import React, { useContext, useEffect, useState } from 'react'
import Loader from './Loader'
import axios from 'axios'
import GlobalContext from '../../context/GlobalContext'
import { Link as ReactLink } from 'react-router-dom'
import Userwall from './Userwall'
import WallPostForm from './WallPostForm'
import { observer } from 'mobx-react-lite'
import { Box, Button, Grid, Typography, Accordion, AccordionSummary, AccordionDetails, Divider } from '@mui/material'
import PetsIcon from '@mui/icons-material/Pets'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const UserPage = observer(() => {
  const { MainStore, UserStore } = useContext(GlobalContext)
  const [expanded, setExpanded] = useState(false)

  const handleChange = () => {
    setExpanded(!expanded)
  }

  useEffect(() => {
    MainStore.setLoad(true)
    userAxios()
    // eslint-disable-next-line
  }, [])

  const userAxios = () => {
    let token = localStorage.getItem('token')

    axios({
      url: 'http://192.168.1.5:5000/user/',
      method: 'get',
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then(response => {
        if (response.data.authError === true) {
          MainStore.logout()
        }
        UserStore.setUser(response.data.user)
      })
      .catch(err => {
        console.log(err)
        MainStore.logout()
      })
      .finally(() => setTimeout(() => MainStore.setLoad(false), 1500))
  }

  return (
    <>
      <Grid container sx={{
        height: '100%',
      }}>
        <Grid item xs={8} sx={{
          // border: '1px solid blue',
          // bgcolor: 'white',
        }}>
          {
            MainStore.isLoad
              ? <Box sx={{
                height: '100%',
                // border: '1px solid red',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Loader />
              </Box>
              :
              <>
                <Accordion expanded={expanded} sx={{
                  position: 'relative',
                  borderRadius: '6px'
                }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon onClick={handleChange} />} sx={{
                    position: 'static',
                    '& .MuiAccordionSummary-expandIconWrapper': {
                      position: 'absolute',
                      border: '1px solid silver',
                      bottom: '-20px',
                      p: '5px',
                      borderRadius: '50%',
                      bgcolor: 'white',
                      transition: '0.3s'
                    }
                  }}>
                    <Grid container>
                      <Grid item xs={4}>
                        <Box sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          // border: '1px solid blue',
                          height: `${!expanded ? '40px' : '100px'}`
                        }}>
                          <PetsIcon />
                        </Box>
                      </Grid>
                      <Grid item xs={8} sx={{
                        // border: '1px solid red',
                        display: 'flex',
                        alignItems: 'center',
                        pl: '30px'
                      }}>
                        <Typography>{UserStore.user.name} {UserStore.user.surname}</Typography>
                      </Grid>
                    </Grid>
                  </AccordionSummary>
                  <Divider />
                  <AccordionDetails>
                    <Grid container mt={1}>
                      <Grid item xs={4} textAlign='end'>
                        <Typography variant='body1' component='span'>Birthday:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>{UserStore.user.birthday}</Typography>
                      </Grid>
                    </Grid>
                    <Grid container mt={1}>
                      <Grid item xs={4} textAlign='end'>
                        <Typography variant='body1' component='span'>Hobbies:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>{UserStore.user.biography}</Typography>
                      </Grid>
                    </Grid>
                    <Box sx={{
                      textAlign: 'center',
                      mb: '10px',
                      mt: '5px'
                    }}>
                      <ReactLink to="/settings">
                        <Button variant='outlined' size='small'>Change user info</Button>
                      </ReactLink>
                    </Box>
                  </AccordionDetails>
                </Accordion>
                <WallPostForm />
                <Userwall />
              </>
          }
        </Grid>

        <Grid item xs={4}>
          {/* aside */}
        </Grid>

      </Grid>
    </>
  )
})

export default UserPage
