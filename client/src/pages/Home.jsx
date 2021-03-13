import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em',
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
    },
  },

  root: {
    fontFamily: `'Open Sans', 'sans-serif'`,
  },
}));

export default function Home() {
  const classes = useStyles();
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  const [conversations, setConversations] = useState([]);
  const [userList, setUserList] = useState([]);
  const [conversation, setConversation] = useState({});
  const [convoLoading, setConvoLoading] = useState(false);

  useEffect(() => {
    if (!user) history.push('/signup');
  }, [user, history]);

  useEffect(() => {
    async function getConversations() {
      const { data } = await axios.get('/conversations');
      setConversations(data);
    }

    getConversations();
  }, [conversation]);

  if (!conversations) {
    return <p>Loading...</p>;
  }

  return (
    <Container className={classes.root}>
      <Grid container direction="row">
        <Grid item sm={4}>
          <Sidebar
            userList={userList}
            setUserList={setUserList}
            currentUser={user}
            conversations={conversations}
            setConversation={setConversation}
            conversation={conversation}
            setConvoLoading={setConvoLoading}
          />
        </Grid>
        <Grid item sm={8}>
          <Chat
            conversation={conversation}
            setConversation={setConversation}
            user={user}
            convoLoading={convoLoading}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
