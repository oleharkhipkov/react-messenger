import React, { useRef } from 'react';
import MessageInput from './MessageInput';
import ChatHeader from './ChatHeader';
import Conversation from './Conversation';
import NoMessages from './NoMessages';
import Box from '@material-ui/core/Box';
import { useStyles } from '../styles/Chat';

const Chat = ({ conversation, setConversation, user }) => {
  const classes = useStyles();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () =>
    messagesEndRef.current.scrollIntoView({ behavior: 'auto' });

  if (!conversation.users) {
    return <NoMessages />;
  }

  return (
    <Box className={classes.activeChat}>
      <ChatHeader conversation={conversation} user={user} />
      <Conversation
        conversation={conversation}
        user={user}
        scrollToBottom={scrollToBottom}
        messagesEndRef={messagesEndRef}
      />
      <MessageInput
        conversation={conversation}
        setConversation={setConversation}
      />
    </Box>
  );
};

export default Chat;
