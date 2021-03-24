import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../styles/NoMessages';

const NoMessages = () => {
  const classes = useStyles();

  return (
    <Box className={classes.noMessages}>
      <Typography className={classes.noMessagesHeading}>
        You don't have a message selected
      </Typography>
      <Typography>
        Choose one from you existing messages, or search for users and start a
        new one
      </Typography>
    </Box>
  );
};

export default NoMessages;
