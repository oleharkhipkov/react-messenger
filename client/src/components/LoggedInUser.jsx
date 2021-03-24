import React from 'react';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../styles/LoggedInUser';

const LoggedInUser = ({ user }) => {
  const classes = useStyles();
  return (
    <Box display="flex" alignItems="center">
      <Avatar className={classes.userImg}>
        {user.username.substring(0, 2).toUpperCase()}
      </Avatar>
      <Box>
        <Typography className={classes.username}>{user.username}</Typography>
      </Box>
    </Box>
  );
};

export default LoggedInUser;
