import React, { useState } from 'react';
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
}) => {
  const classes = useStyles();
  const [body, setBody] = useState('');

  const sendMessage = useSendMessage();

  const handleChange = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (body === '') {
      return;
    }

    try {
      const message = await sendMessage(conversation, body);

      setBody('');
      setConversation({
        ...conversation,
        messages: [...conversation.messages, message],
      });
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
