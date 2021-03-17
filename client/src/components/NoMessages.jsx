import React from 'react';
import { useStyles } from '../styles/NoMessages';

const NoMessages = () => {
  const classes = useStyles();

  return (
    <div className={classes.noMessages}>
      <p className={classes.noMessagesHeading}>
        You don't have a message selected
      </p>
      <p>
        Choose one from you existing messages, or search for users and start a
        new one
      </p>
    </div>
  );
};

export default NoMessages;
