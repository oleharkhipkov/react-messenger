import React from 'react';
import { Box } from '@material-ui/core';
import { useStyles } from '../styles/NotificationBadge';

const NotificationBadge = ({ unreadMessagesCount, convo }) => {
  const classes = useStyles();
  return (
    <Box className={classes.notificationBadge}>
      {unreadMessagesCount(convo)}
    </Box>
  );
};

export default NotificationBadge;
