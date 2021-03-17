import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Box from '@material-ui/core/Box';
import { useStyles } from '../styles/SidebarHeader';

const SidebarHeader = ({
  currentUser,
  loggedInUser,
  handleClick,
  anchorEl,
  handleClose,
  logout,
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.sidebarHeader}>
      <Box style={{ fontSize: '20px' }}>{currentUser && loggedInUser()}</Box>
      <IconButton
        aria-controls="customized-menu"
        aria-haspopup="true"
        edge="end"
        onClick={handleClick}
      >
        <MoreHorizIcon style={{ color: '#95a7c4' }} />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {' '}
        <MenuItem onClick={() => logout()}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default SidebarHeader;
