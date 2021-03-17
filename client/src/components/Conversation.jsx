import React, { useEffect } from 'react';
import { useStyles } from '../styles/Conversation';

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
