import React from 'react';
import { Box } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import NotificationBadge from './NotificationBadge';
import { useStyles, StyledBadge } from '../styles/ConvoUserListItem';

const ConvoUserListItem = ({
  user,
  onlineUsers,
  convo,
  conversation,
  handleGetConversation,
  isTyping,
  unreadMessagesCount,
  socket,
}) => {
  const classes = useStyles();
  return (
    <Box
      onClick={() => {
        socket.emit('leave room', conversation._id);
        handleGetConversation(convo._id);
      }}
      key={convo._id}
      className={classes.conversation}
    >
      <StyledBadge
        variant="dot"
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        color={
          Object.values(onlineUsers).includes(
            convo.users.find((u) => u.username !== user.username)._id
          )
            ? '#1ced84'
            : '#bebebe'
        }
      >
        <Avatar className={classes.userImg} color="primary">
          {convo.users
            .find((u) => u.username !== user.username)
            .username.substring(0, 2)}
        </Avatar>
      </StyledBadge>
      <Box className={classes.convoInfo}>
        <Typography className={classes.username}>
          {convo.users.find((u) => u.username !== user.username).username}
        </Typography>
        {convo.mostRecentMessage && (
          <Typography className={classes.mostRecentMessage}>
            {isTyping && conversation._id === convo._id ? (
              <Typography className={classes.typingText}>Typing...</Typography>
            ) : (
              convo.mostRecentMessage.body
            )}
          </Typography>
        )}
      </Box>
      {convo._id === conversation._id
        ? null
        : unreadMessagesCount(convo) > 0 && (
            <NotificationBadge
              unreadMessagesCount={unreadMessagesCount}
              convo={convo}
            />
          )}
    </Box>
  );
};

export default ConvoUserListItem;
