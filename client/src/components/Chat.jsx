import React, { useRef } from 'react';
import MessageInput from './MessageInput';
import ChatHeader from './ChatHeader';
import Conversation from './Conversation';
import { makeStyles } from '@material-ui/core/styles';
import NoMessages from './NoMessages';

const useStyles = makeStyles((theme) => ({
  activeChat: {
    height: '95vh',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Chat = ({ conversation, setConversation, user }) => {
  const classes = useStyles();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () =>
    messagesEndRef.current.scrollIntoView({ behavior: 'auto' });

  if (!conversation.users) {
    return <NoMessages />;
  }

  return (
    <div className={classes.activeChat}>
      <ChatHeader conversation={conversation} user={user} />
      <Conversation
        conversation={conversation}
        user={user}
        scrollToBottom={scrollToBottom}
        messagesEndRef={messagesEndRef}
      />
      <MessageInput
        conversation={conversation}
        setConversation={setConversation}
      />
    </div>
  );
};

export default Chat;
