import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const useStyles = makeStyles((theme) => ({
  sidebarHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: '70px',
    padding: '0px 20px 0px 10px',
    alignItems: 'center',
  },
}));

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
    <div className={classes.sidebarHeader}>
      <div style={{ fontSize: '20px' }}>{currentUser && loggedInUser()}</div>
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
    </div>
  );
};

export default SidebarHeader;
