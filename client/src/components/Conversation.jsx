import React, { useEffect } from 'react';
import CurrentConvo from './CurrentConvo';
import Box from '@material-ui/core/Box';
import TypingDots from './TypingDots';
import { useStyles } from '../styles/Conversation';

const Conversation = ({
  user,
  conversation,
  isTyping,
  scrollToBottom,
  messagesEndRef,
}) => {
  const classes = useStyles();

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  const isNotLoggedInUser = () =>
    conversation.users.find((u) => u._id !== user.id).username.substring(0, 2);

  return (
    <Box className={classes.chat}>
      {conversation.messages && (
        <CurrentConvo
          conversation={conversation}
          user={user}
          isTyping={isTyping}
        />
      )}
      <Box ref={messagesEndRef} />
      <Box>
        {isTyping && (
          <Box style={{ maxWidth: '70%', display: 'flex' }}>
            <Box className={classes.userAvatar}>{isNotLoggedInUser()}</Box>
            <TypingDots />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Conversation;
