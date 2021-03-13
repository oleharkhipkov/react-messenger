import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  userAvatar: {
    minWidth: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightGray',
    marginRight: '.75rem',
    textTransform: 'uppercase',
  },
  chat: {
    display: 'flex',
    flexDirection: 'column',
    // width: '100%',
    height: '470px',
    overflow: 'auto',
    padding: '0 3rem',
    paddingTop: '2rem',
    paddingBottom: '2rem',
  },
  messageBubbleLeft: {
    padding: '10px',
    color: '#fff',
    borderRadius: '0 10px 10px 10px',
    marginTop: '4px',
    display: 'inline-block',
    backgroundImage: 'linear-gradient(225deg, #6cc1ff 0%, #3a8dff 100%)',
    textAlign: 'left',
  },
  messageBubbleRight: {
    padding: '10px',
    color: '#95a7c4',
    borderRadius: '10px 10px 0px 10px',
    marginTop: '4px',
    display: 'inline-block',
    backgroundColor: '#f4f6fA',
    textAlign: 'left',
  },
  msgContentRight: {
    textAlign: 'right',
  },
  timeStamp: {
    margin: 0,
    fontSize: '11px',
    color: '#a0a0a0',
    fontWeight: 'bold',
  },
  end: {
    alignSelf: 'flex-end',
  },
}));

const Conversation = ({
  conversation,
  user,
  scrollToBottom,
  messagesEndRef,
}) => {
  const classes = useStyles();

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  const convertDateToClockTime = (date) => {
    const dt = new Date(date);
    let hours = dt.getHours();
    let minutes = dt.getMinutes();

    hours = hours % 12;
    hours = hours ? hours : 12; // if hour equals 0, make it 12
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${minutes}`;
  };

  const currentConversation = () => {
    return conversation.messages.map((msg) => {
      const isSenderLoggedInUser = () => msg.sender._id === user.id;

      return (
        <div
          key={msg._id}
          className={isSenderLoggedInUser() && classes.end}
          style={{ maxWidth: '70%', display: 'flex' }}
        >
          {msg.sender._id !== user.id && (
            <div className={classes.userAvatar}>
              {msg.sender.username.substring(0, 2)}
            </div>
          )}
          <div className={isSenderLoggedInUser() && classes.msgContentRight}>
            <p className={classes.timeStamp}>
              {!isSenderLoggedInUser() && msg.sender.username}{' '}
              {convertDateToClockTime(msg.createdAt)}
            </p>
            <p
              className={
                isSenderLoggedInUser()
                  ? classes.messageBubbleRight
                  : classes.messageBubbleLeft
              }
            >
              {msg.body}
            </p>
          </div>
        </div>
      );
    });
  };

  return (
    <div className={classes.chat}>
      {conversation.messages ? currentConversation() : null}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Conversation;
