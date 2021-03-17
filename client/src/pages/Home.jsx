import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../UserContext';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { useStyles } from '../styles/Home';

export default function Home() {
  const classes = useStyles();
  const history = useHistory();

  const { user } = useContext(UserContext);

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
    return <CircularProgress />;
  }

  return (
    <Container className={classes.root}>
      <Grid container direction="row">
        <Grid item xs={12} sm={4}>
          <Sidebar
            userList={userList}
            setUserList={setUserList}
            conversations={conversations}
            setConversation={setConversation}
            conversation={conversation}
            setConvoLoading={setConvoLoading}
          />
        </Grid>
        <Grid item xs={12} sm={8} className={classes.rightGridItem}>
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
