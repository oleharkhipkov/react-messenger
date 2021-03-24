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

const Sidebar = ({
  userList,
  setUserList,
  conversations,
  setConversation,
  conversation,
  setConvoLoading,
  setError,
  setShowError,
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
    } catch (err) {
      setError(err.message);
      setShowError(true);
    }
    setConvoLoading(false);
  };

  const handleClick = (e) => setAnchorEl(e.target);

  const handleClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    try {
      await logout();

      history.push('/login');
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
        />
        <Typography variant="h1" className={classes.headingText}>
          Chats
        </Typography>
        <Search
          userList={userList}
          setUserList={setUserList}
          conversations={conversations}
          setConversation={setConversation}
          handleGetConversation={handleGetConversation}
          user={user}
          setError={setError}
          setShowError={setShowError}
        />
      </Box>
      <ConvoUserList
        conversations={conversations}
        conversation={conversation}
        user={user}
        setConversation={setConversation}
        setConvoLoading={setConvoLoading}
        handleGetConversation={handleGetConversation}
      />
    </Box>
  );
};

export default Sidebar;
