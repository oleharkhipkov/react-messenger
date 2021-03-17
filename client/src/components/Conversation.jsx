import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../styles/Conversation';

const Conversation = ({
  conversation,
  user,
  scrollToBottom,
  messagesEndRef,
}) => {
  const classes = useStyles();

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  const convertDateToClockTime = (date) => {
    const dt = new Date(date);
    let hours = dt.getHours();
    let minutes = dt.getMinutes();

    hours = hours % 12;
    hours = hours ? hours : 12; // if hour equals 0, make it 12
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${minutes}`;
  };

  const currentConversation = () => {
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

  return (
    <Box className={classes.chat}>
      {conversation.messages ? currentConversation() : null}
      <Box ref={messagesEndRef} />
    </Box>
  );
};

export default Conversation;
