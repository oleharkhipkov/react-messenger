import React, { useState, useEffect, useRef } from 'react';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { useSendMessage } from '../actions/messages';
import { useStyles } from '../styles/MessageInput';

const MessageInput = ({
  conversation,
  setConversation,
  setError,
  setShowError,
  socket,
  conversations,
  setNewMessage,
}) => {
  const classes = useStyles();
  const [body, setBody] = useState('');
  const timeOut = useRef(null);

  useEffect(() => {
    socket.on('newMessage', (newMessage) => {
      const newMessageForCurrentConvo =
        newMessage.conversation._id === conversation._id;
      const newMessageForUserConversations = conversations.find(
        (c) => c._id === newMessage.conversation._id
      );

      if (newMessageForCurrentConvo) {
        let messages = conversation.messages;
        messages.push(newMessage);

        setConversation({
          ...conversation,
          messages,
        });
      } else if (newMessageForUserConversations) {
        setNewMessage(newMessage);
      }
    });
    // eslint-disable-next-line
  }, [conversation._id]);

  useEffect(() => {
    if (body === '') {
      socket.emit('not typing', conversation._id);
    }
  }, [body, conversation._id, socket]);

  useEffect(() => {
    clearTimeout(timeOut.current);
    timeOut.current = setTimeout(() => {
      socket.emit('not typing', conversation._id);
    }, 300);
  }, [body, conversation._id, socket]);

  const sendMessage = useSendMessage();

  const handleChange = (e) => {
    socket.emit('typing', conversation._id);
    setBody(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (body === '') {
      return;
    }

    try {
      await sendMessage(conversation, body);
      socket.emit('not typing', conversation._id);

      setBody('');
    } catch (err) {
      setError(err.message);
      setShowError(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          id="message"
          placeholder="Type something..."
          variant="outlined"
          fullWidth
          value={body}
          autoComplete="off"
          onChange={(event) => handleChange(event)}
          InputProps={{
            className: classes.messageInput,
            disableunderline: 'true',
            endAdornment: (
              <Box className={classes.messageIcons}>
                <FiberManualRecordIcon className={classes.recordIcon} />
                <FileCopyIcon />
              </Box>
            ),
          }}
        />
      </form>
    </>
  );
};

export default MessageInput;
