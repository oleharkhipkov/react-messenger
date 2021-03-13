import React, { useState } from 'react';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles(() => ({
  form: {
    position: 'absolute',
    bottom: '0px',
    right: '0px',
    left: '0px',
    padding: '0 3rem',
    marginBottom: '3.5rem',
  },
  recordIcon: { marginRight: '12px' },
  messageInput: {
    height: '70px',
    borderRadius: '8px',
    backgroundColor: '#f4f6fa',
    display: 'flex',
    paddingLeft: '20px',
    alignItems: 'center',
    width: '100%',
  },
  messageIcons: {
    display: 'flex',
    color: '#d1d9e6',
    marginRight: '10px',
  },
}));

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
            <div className={classes.messageIcons}>
              <FiberManualRecordIcon className={classes.recordIcon} />
              <FileCopyIcon />
            </div>
          ),
        }}
      />
    </form>
  );
};

export default MessageInput;
