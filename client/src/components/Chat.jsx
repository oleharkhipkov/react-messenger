import React, { useRef, useEffect } from 'react';
import MessageInput from './MessageInput';
import ChatHeader from './ChatHeader';
import Conversation from './Conversation';
import NoMessages from './NoMessages';
import Box from '@material-ui/core/Box';
import { useStyles } from '../styles/Chat';

const Chat = ({
  user,
  conversation,
  setConversation,
  conversations,
  setNewMessage,
  setError,
  setShowError,
  isTyping,
  setIsTyping,
  onlineUsers,
  socket,
}) => {
  const classes = useStyles();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.emit('join room', conversation._id);
    socket.on('typing', () => setIsTyping(true));
    socket.on('not typing', () => setIsTyping(false));

    return () => {
      socket.off();
    };
    // eslint-disable-next-line
  }, [socket, conversation._id]);

  const scrollToBottom = () =>
    messagesEndRef.current.scrollIntoView({ behavior: 'auto' });

  if (!conversation.users) {
    return <NoMessages />;
  }

  return (
    <Box className={classes.activeChat}>
      <ChatHeader
        conversation={conversation}
        user={user}
        onlineUsers={onlineUsers}
      />
      <Conversation
        user={user}
        conversation={conversation}
        scrollToBottom={scrollToBottom}
        messagesEndRef={messagesEndRef}
        isTyping={isTyping}
      />
      <MessageInput
        conversation={conversation}
        setConversation={setConversation}
        conversations={conversations}
        setNewMessage={setNewMessage}
        setError={setError}
        setShowError={setShowError}
        socket={socket}
      />
    </Box>
  );
};

export default Chat;
