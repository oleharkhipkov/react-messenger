import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  noMessages: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  noMessagesHeading: {
    fontSize: '20px',
  },
}));

const NoMessages = () => {
  const classes = useStyles();

  return (
    <div className={classes.noMessages}>
      <p className={classes.noMessagesHeading}>
        You don't have a message selected
      </p>
      <p>Choose one from you existing messages, or start a new one</p>
    </div>
  );
};

export default NoMessages;
