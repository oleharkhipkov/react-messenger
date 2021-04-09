import React from 'react';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { useStyles, StyledBadge } from '../styles/LoggedInUser';

const LoggedInUser = ({ user, onlineUsers }) => {
  const classes = useStyles();
  return (
    <Box display="flex" alignItems="center">
      <StyledBadge
        variant="dot"
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        color={
          Object.values(onlineUsers).includes(user.id) ? '#1ced84' : '#bebebe'
        }
      >
        <Avatar className={classes.userImg}>
          {user.username.substring(0, 2)}
        </Avatar>
      </StyledBadge>
      <Box>
        <Typography className={classes.username}>{user.username}</Typography>
      </Box>
    </Box>
  );
};

export default LoggedInUser;
