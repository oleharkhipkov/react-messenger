import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import ConvoUserListItem from './ConvoUserListItem';
import { useStyles } from '../styles/ConvoUserList';

const ConvoUserList = ({
  user,
  onlineUsers,
  conversation,
  conversations,
  handleGetConversation,
  isTyping,
  readMessages,
  socket,
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (conversation) {
      readMessages();
    }
    // eslint-disable-next-line
  }, [conversation]);

  const unreadMessagesCount = (convo) =>
    convo.messages.filter(
      (msg) => msg.sender !== user.id && !msg.readBy.includes(user.id)
    ).length;

  return (
    <Box className={classes.convoUserList}>
      {conversations.map((convo) => (
        <ConvoUserListItem
          key={convo._id}
          socket={socket}
          handleGetConversation={handleGetConversation}
          convo={convo}
          conversation={conversation}
          onlineUsers={onlineUsers}
          user={user}
          isTyping={isTyping}
          unreadMessagesCount={unreadMessagesCount}
        />
      ))}
    </Box>
  );
};

export default ConvoUserList;
