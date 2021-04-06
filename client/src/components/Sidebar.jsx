import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useHistory } from 'react-router-dom';
import Search from './Search';
import ConvoUserList from './ConvoUserList';
import SidebarHeader from './SidebarHeader';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useLogout } from '../actions/auth';
import { useGetConversation } from '../actions/messages';
import { useStyles } from '../styles/Sidebar';
import axios from 'axios';

const Sidebar = ({
  userSearchList,
  setUserSearchList,
  conversations,
  setConversation,
  conversation,
  setConvoLoading,
  setError,
  setShowError,
  onlineUsers,
  socket,
  isTyping,
}) => {
  const classes = useStyles();
  const { user, setUser } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const history = useHistory();
  const getConversation = useGetConversation();
  const logout = useLogout();

  const handleGetConversation = async (id) => {
    setConvoLoading(true);
    try {
      const data = await getConversation(id);
      setConversation(data);
      readMessages(data);
    } catch (err) {
      setError(err.message);
      setShowError(true);
    }
    setConvoLoading(false);
  };

  const readMessages = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await axios.put(
      '/messages/read',
      JSON.stringify({ conversationId: conversation._id }),
      config
    );
  };

  const handleClick = (e) => setAnchorEl(e.target);

  const handleClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    try {
      await logout();
      history.push('/login');
      socket.disconnect();

      setUser(null);
    } catch (err) {
      setError(err.message);
      setShowError(true);
    }
  };

  return (
    <Box className={classes.sidebarContainer}>
      <Box style={{ position: 'relative' }}>
        <SidebarHeader
          currentUser={user}
          handleClick={handleClick}
          anchorEl={anchorEl}
          handleClose={handleClose}
          handleLogout={handleLogout}
          onlineUsers={onlineUsers}
        />
        <Typography variant="h1" className={classes.headingText}>
          Chats
        </Typography>
        <Search
          user={user}
          handleGetConversation={handleGetConversation}
          setConversation={setConversation}
          userSearchList={userSearchList}
          setUserSearchList={setUserSearchList}
          setError={setError}
          setShowError={setShowError}
        />
      </Box>
      <ConvoUserList
        user={user}
        conversation={conversation}
        handleGetConversation={handleGetConversation}
        setConversation={setConversation}
        setConvoLoading={setConvoLoading}
        conversations={conversations}
        onlineUsers={onlineUsers}
        isTyping={isTyping}
        readMessages={readMessages}
        socket={socket}
      />
    </Box>
  );
};

export default Sidebar;
