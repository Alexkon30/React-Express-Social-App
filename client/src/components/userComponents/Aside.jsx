import React from 'react'
import { NavLink } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import MailIcon from '@mui/icons-material/Mail';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';


const Aside = () => {

  return (
    <Box sx={{
      flexDirection: 'column',
      display: 'flex',
    }}>
      <NavLink to="/user" className="aside__link" activeClassName="active">
        <Box sx={{
          display: 'flex',
        }}>
          <HomeIcon fontSize="small" />
          <Typography ml={1}>My page</Typography>
        </Box>
      </NavLink>
      <NavLink to="/messenger" className="aside__link" activeClassName="active">
        <Box sx={{
          display: 'flex',
        }}>
          <MailIcon fontSize="small" />
          <Typography ml={1}>Messenger</Typography>
        </Box>
      </NavLink>
      <NavLink to="/friends" className="aside__link" activeClassName="active">
        <Box sx={{
          display: 'flex',
        }}>
          <PeopleIcon fontSize="small" />
          <Typography ml={1}>Friends</Typography>
        </Box>
      </NavLink>
      <NavLink to="/people" className="aside__link" activeClassName="active">
        <Box sx={{
          display: 'flex',
        }}>
          <SearchIcon fontSize="small" />
          <Typography ml={1}>Search</Typography>
        </Box>
      </NavLink>
      <NavLink to="/settings" className="aside__link" activeClassName="active">
        <Box sx={{
          display: 'flex',
        }}>
          <SettingsIcon fontSize="small" />
          <Typography ml={1}>Settings</Typography>
        </Box>
      </NavLink>
    </Box >
  )
}

export default Aside
