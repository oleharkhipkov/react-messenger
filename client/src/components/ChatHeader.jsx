import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const useStyles = makeStyles((theme) => ({
  chatHeader: {
    backgroundColor: '#fff',
    // width: '100%',
    height: '70px',
    boxShadow: '0 2px 20px 0 rgba(88,133,196,0.10)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '1.5rem',
    paddingRight: '3.5rem',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userUsername: {
    fontFamily: 'Open Sans',
    fontSize: '20px',
    color: '#000000',
    letterSpacing: '-0.29px',
  },
  userStatus: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '12px',
    marginTop: '4px',
  },
  status: {
    height: '8px',
    width: '8px',
    borderRadius: '50%',
    backgroundColor: '#1CED84',
    display: 'flex',
    marginRight: '4px',
  },
}));

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
