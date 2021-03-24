import React from 'react';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { useStyles, StyledBadge } from '../styles/ConvoUserList';

const ConvoUserList = ({ conversations, user, handleGetConversation }) => {
  const classes = useStyles();

  const conversationList = () =>
    conversations.map((convo) => (
      <Box
        onClick={() => handleGetConversation(convo._id)}
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
          <Typography className={classes.username}>
            {convo.users.find((u) => u.username !== user.username).username}
          </Typography>

          {convo.mostRecentMessage && (
            <Typography className={classes.mostRecentMessage}>
              {convo.mostRecentMessage.body}
            </Typography>
          )}
        </Box>
      </Box>
    ));

  return <Box className={classes.convoUserList}>{conversationList()}</Box>;
};

export default ConvoUserList;
