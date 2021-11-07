import React from 'react'
import { Link as ReactLink } from 'react-router-dom'
import { Grid, Box, Typography } from '@mui/material'
import PetsIcon from '@mui/icons-material/Pets';


function Dialog({ name, surname, dialogId, onClick }) {

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
          to={`/messenger/${dialogId}`}
          onClick={onClick}
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
        {/* Buttons */}
      </Grid>
    </Grid>
  )
}

export default Dialog
