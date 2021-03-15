import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  convoUserList: {
    marginTop: '1rem',
    height: '100%',
    overflowY: 'auto',
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
  convoInfo: {
    marginLeft: '1rem',
    paddingRight: '5px',
  },
  userImg: {
    minWidth: '44px',
    minHeight: '44px',
    backgroundColor: 'lightGray',
    color: 'black',
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
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': '2',
    overflow: 'hidden',
  },
}));

const ConvoUserList = ({ conversations, user, getConversation }) => {
  const classes = useStyles();

  const StyledBadge = withStyles(() => ({
    badge: {
      backgroundColor: '#1CED84',
      color: '#1CED84',
      border: '2px solid white',
      height: '14px',
      width: '14px',
      borderRadius: '50%',
    },
  }))(Badge);

  const conversationList = () =>
    conversations.map((convo) => (
      <Box
        onClick={() => getConversation(convo._id)}
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
        >
          <Avatar className={classes.userImg} color="primary">
            {convo.users
              .find((u) => u.username !== user.username)
              .username.substring(0, 2)}
          </Avatar>
        </StyledBadge>
        <Box className={classes.convoInfo}>
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
