import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  convoUserList: {
    marginTop: '1rem',
  },
  conversation: {
    display: 'flex',
    height: '85px',
    alignItems: 'center',
    margin: '6px 0px',
    paddingTop: '4px',
    paddingBottom: '4px',
    paddingLeft: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px 0 rgba(88,133,196,0.05)',
    boxSizing: 'border-box',
    cursor: 'pointer',
    '&:hover': { backgroundColor: 'rgba(88,133,196,0.05)' },
  },
  userImg: {
    minWidth: '44px',
    minHeight: '44px',
    borderRadius: '50%',
    marginRight: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#72bcd4',
    textTransform: 'uppercase',
  },
  username: {
    fontSize: '14px',
  },
  mostRecentMessage: {
    fontSize: '12px',
    color: '#9cadc8',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '300px',
    whiteSpace: 'nowrap',
  },
}));

const ConvoUserList = ({ conversations, user, getConversation }) => {
  const classes = useStyles();

  const conversationList = () =>
    conversations.map((convo) => (
      <Box
        onClick={() => getConversation(convo._id)}
        key={convo._id}
        className={classes.conversation}
      >
        <div className={classes.userImg}>
          {convo.users
            .find((u) => u.username !== user.username)
            .username.substring(0, 2)}
        </div>
        <Box>
          <p className={classes.username}>
            {convo.users.find((u) => u.username !== user.username).username}
          </p>
          {convo.mostRecentMessage && (
            <p className={classes.mostRecentMessage}>
              {convo.mostRecentMessage.body}
            </p>
          )}
        </Box>
      </Box>
    ));

  return <div className={classes.convoUserList}>{conversationList()}</div>;
};

export default ConvoUserList;
