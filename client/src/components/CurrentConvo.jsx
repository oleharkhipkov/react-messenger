import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { convertDateToClockTime } from '../utils/dates';
import { useStyles } from '../styles/CurrentConvo';

const CurrentConvo = ({ conversation, user }) => {
  const classes = useStyles();

  return conversation.messages.map((msg) => {
    const isSenderLoggedInUser = () => msg.sender._id === user.id;

    return (
      <Box
        key={msg._id}
        className={isSenderLoggedInUser() ? classes.end : undefined}
        style={{ maxWidth: '70%', display: 'flex' }}
      >
        {msg.sender._id !== user.id && (
          <Box className={classes.userAvatar}>
            {msg.sender.username.substring(0, 2)}
          </Box>
        )}
        <Box
          className={
            isSenderLoggedInUser() ? classes.msgContentRight : undefined
          }
        >
          <Typography className={classes.timeStamp}>
            {!isSenderLoggedInUser() && msg.sender.username}{' '}
            {convertDateToClockTime(msg.createdAt)}
          </Typography>
          <Typography
            className={
              isSenderLoggedInUser()
                ? classes.messageBubbleRight
                : classes.messageBubbleLeft
            }
          >
            {msg.body}
          </Typography>
        </Box>
      </Box>
    );
  });
};

export default CurrentConvo;
