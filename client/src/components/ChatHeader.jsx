import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Box from '@material-ui/core/Box';
import { useStyles } from '../styles/ChatHeader';

const ChatHeader = ({ conversation, user, onlineUsers }) => {
  const classes = useStyles();

  const activeChatUser = () =>
    conversation.users.find((u) => u.username !== user.username).username;

  const userIsOnline = () => {
    return Object.values(onlineUsers).includes(
      conversation.users.find((u) => u.username !== user.username)._id
    );
  };

  return (
    <Box className={classes.chatHeader}>
      <Box className={classes.userInfo}>
        <Box className={classes.userUsername}>{activeChatUser()}</Box>
        <Box className={classes.userStatus}>
          <Box
            className={classes.status}
            style={{ backgroundColor: userIsOnline() ? '#1ced84' : '#bebebe' }}
          ></Box>
          <Box style={{ color: '#BFC9DB' }}>
            {userIsOnline() ? 'Online' : 'Offline'}
          </Box>
        </Box>
      </Box>
      <IconButton
        aria-controls="customized-menu"
        aria-haspopup="true"
        edge="end"
      >
        <MoreHorizIcon style={{ color: '#95a7c4' }} />
      </IconButton>
    </Box>
  );
};

export default ChatHeader;
