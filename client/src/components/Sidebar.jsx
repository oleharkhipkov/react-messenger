import React, { useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import { useHistory } from 'react-router-dom';
import Search from './Search';
import ConvoUserList from './ConvoUserList';
import SidebarHeader from './SidebarHeader';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { useStyles } from '../styles/Sidebar';

const Sidebar = ({
  userList,
  setUserList,
  conversations,
  setConversation,
  conversation,
  setConvoLoading,
}) => {
  const classes = useStyles();
  const { user, setUser } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

  const loggedInUser = () => (
    <Box display="flex" alignItems="center">
      <Avatar className={classes.userImg}>
        {user.username.substring(0, 2).toUpperCase()}
      </Avatar>
      <Box>
        <Typography className={classes.username}>{user.username}</Typography>
      </Box>
    </Box>
  );

  const getConversation = async (id) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    setConvoLoading(true);
    const { data } = await axios.get(`/conversations/${id}`, config);
    setConvoLoading(false);
    setConversation(data);
  };

  const handleClick = (e) => setAnchorEl(e.target);

  const handleClose = () => setAnchorEl(null);

  const logout = async () => {
    await axios.get('/auth/logout');

    history.push('/login');
    setUser(null);
  };

  return (
    <Box className={classes.sidebarContainer}>
      <Box style={{ position: 'relative' }}>
        <SidebarHeader
          currentUser={user}
          loggedInUser={loggedInUser}
          handleClick={handleClick}
          anchorEl={anchorEl}
          handleClose={handleClose}
          logout={logout}
        />
        <Typography variant="h1" className={classes.headingText}>
          Chats
        </Typography>
        <Search
          userList={userList}
          setUserList={setUserList}
          conversations={conversations}
          setConversation={setConversation}
          getConversation={getConversation}
          user={user}
        />
      </Box>
      <ConvoUserList
        conversations={conversations}
        conversation={conversation}
        user={user}
        setConversation={setConversation}
        setConvoLoading={setConvoLoading}
        getConversation={getConversation}
      />
    </Box>
  );
};

export default Sidebar;
