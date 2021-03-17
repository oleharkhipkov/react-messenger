import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useStyles } from '../styles/ChatHeader';

const ChatHeader = ({ conversation, user }) => {
  const classes = useStyles();

  const activeChatUser = () =>
    conversation.users.find((u) => u.username !== user.username).username;

  return (
    <div className={classes.chatHeader}>
      <div className={classes.userInfo}>
        <div className={classes.userUsername}>{activeChatUser()}</div>
        <div className={classes.userStatus}>
          <div className={classes.status}></div>
          <div style={{ color: '#BFC9DB' }}>Online</div>
        </div>
      </div>
      <IconButton
        aria-controls="customized-menu"
        aria-haspopup="true"
        edge="end"
      >
        <MoreHorizIcon style={{ color: '#95a7c4' }} />
      </IconButton>
    </div>
  );
};

export default ChatHeader;
