import React, { useEffect } from 'react';
import CurrentConvo from './CurrentConvo';
import Box from '@material-ui/core/Box';
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

  return (
    <Box className={classes.chat}>
      {conversation.messages ? (
        <CurrentConvo conversation={conversation} user={user} />
      ) : null}
      <Box ref={messagesEndRef} />
    </Box>
  );
};

export default Conversation;
