import React, { useState } from 'react';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import { useStyles } from '../styles/MessageInput';

const MessageInput = ({ conversation, setConversation }) => {
  const classes = useStyles();
  const [body, setBody] = useState('');

  const handleChange = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/messages',
      JSON.stringify({ conversationId: conversation._id, body }),
      config
    );

    setBody('');

    setConversation({
      ...conversation,
      messages: [...conversation.messages, data],
    });
  };

  return (
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
  );
};

export default MessageInput;
