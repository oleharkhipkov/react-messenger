import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import io from 'socket.io-client';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';
import SnackbarAlert from '../components/SnackbarAlert';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useGetConversations } from '../actions/messages';
import { useStyles } from '../styles/Home';

const endpoint = 'http://localhost:3001';
const socket = io(endpoint);

export default function Home() {
  const classes = useStyles();
  const history = useHistory();
  const getConversations = useGetConversations();

  const { user } = useContext(UserContext);

  const [conversation, setConversation] = useState({});
  const [conversations, setConversations] = useState([]);
  const [convoLoading, setConvoLoading] = useState(false);
  const [userSearchList, setUserSearchList] = useState([]);
  const [newMessage, setNewMessage] = useState({});
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState({});
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!user) history.push('/signup');
  }, [user, history]);

  useEffect(() => {
    if (user) socket.emit('user-online', user);
  }, [user]);

  useEffect(() => {
    socket.on('users-online', (data) => setOnlineUsers(data));
  });

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
  }, [conversation, newMessage]);

  if (!conversations || !user) {
    return <CircularProgress />;
  }

  return (
    <Container className={classes.root}>
      <Grid container direction="row">
        <Grid item xs={12} sm={4}>
          <Sidebar
            userSearchList={userSearchList}
            setUserSearchList={setUserSearchList}
            conversations={conversations}
            setConversation={setConversation}
            conversation={conversation}
            setConvoLoading={setConvoLoading}
            setError={setError}
            setShowError={setShowError}
            onlineUsers={onlineUsers}
            socket={socket}
            isTyping={isTyping}
            user={user}
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
            socket={socket}
            isTyping={isTyping}
            setIsTyping={setIsTyping}
            conversations={conversations}
            setNewMessage={setNewMessage}
            onlineUsers={onlineUsers}
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
