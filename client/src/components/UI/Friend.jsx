import React, { useContext } from 'react'
import { Link as ReactLink } from 'react-router-dom'
import GlobalContext from '../../context/GlobalContext'
import { observer } from 'mobx-react-lite'
import { Grid, Button, Box, Typography } from '@mui/material'
import PetsIcon from '@mui/icons-material/Pets';
import ForumIcon from '@mui/icons-material/Forum';


// import { createTheme, ThemeProvider } from '@mui/material/styles';



const Friend = observer(({ name, surname, id }) => {
  const { ClientStore } = useContext(GlobalContext)

  const getClientInfo = () => {
    ClientStore.setClient({
      name,
      surname,
      id
    })
  }

  return (
    <Grid container sx={{
      // border: '1px solid blue',
      p: '10px',
      bgcolor: 'white',
      borderRadius: '6px'
    }}>
      <Grid item xs={1} sx={{
        // border: '1px solid red',
        p: '5px',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <Box sx={{
          borderRadius: '50%',
          border: '1px solid silver',
          width: '40px',
          display: 'flex',
          justifyContent: 'center',
          p: '10px'
        }}>
          <PetsIcon />
        </Box>
      </Grid>
      <Grid item xs={7} sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}>
        <ReactLink
          to={`/people/${id}`}
          onClick={getClientInfo}
        >
          <Box>
            <Typography sx={{
              color: '#363C42',
              pl: '40px'
            }}>{name} {surname}</Typography>
          </Box>
        </ReactLink>
      </Grid>
      <Grid item xs={4} sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Button
          // variant='outlined'
          // onClick={() => changeFriends(id, 'remove')}
          size='small'
          sx={{
            mr: '10px',
            color: '#363C42',
            ':hover': {
              border: '2px solid #363C42'
            }
          }}
        >
          <ForumIcon />
        </Button>
      </Grid>
    </Grid>
  )
})

export default Friend
