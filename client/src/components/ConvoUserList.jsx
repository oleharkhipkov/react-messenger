import React from 'react';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import { useStyles, StyledBadge } from '../styles/ConvoUserList';

const ConvoUserList = ({ conversations, user, getConversation }) => {
  const classes = useStyles();

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
