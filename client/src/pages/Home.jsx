import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';
import SnackbarAlert from '../components/SnackbarAlert';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useGetConversations } from '../actions/messages';
import { useStyles } from '../styles/Home';

export default function Home() {
  const classes = useStyles();
  const history = useHistory();
  const getConversations = useGetConversations();

  const { user } = useContext(UserContext);

  const [conversations, setConversations] = useState([]);
  const [userList, setUserList] = useState([]);
  const [conversation, setConversation] = useState({});
  const [convoLoading, setConvoLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) history.push('/signup');
  }, [user, history]);

  useEffect(() => {
    async function handleGetConversations() {
      try {
        const data = await getConversations();
        setConversations(data);
      } catch (err) {
        setError(err.message);
        setShowError(true);
      }
    }

    handleGetConversations();
    // eslint-disable-next-line
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
            setError={setError}
            setShowError={setShowError}
          />
        </Grid>
        <Grid item xs={12} sm={8} className={classes.rightGridItem}>
          <Chat
            conversation={conversation}
            setConversation={setConversation}
            user={user}
            convoLoading={convoLoading}
            setError={setError}
            setShowError={setShowError}
          />
        </Grid>
        <SnackbarAlert
          error={error}
          showError={showError}
          setShowError={setShowError}
        />
      </Grid>
    </Container>
  );
}
