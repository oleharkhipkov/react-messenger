import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useHistory } from 'react-router-dom';
import Search from './Search';
import ConvoUserList from './ConvoUserList';
import SidebarHeader from './SidebarHeader';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
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
}) => {
  const classes = useStyles();
  const { user, setUser } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

  const getConversation = useGetConversation();
  const logout = useLogout();

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

  const getConvo = async (id) => {
    setConvoLoading(true);

    const convo = await getConversation(id);

    setConvoLoading(false);
    setConversation(convo);
  };

  const handleClick = (e) => setAnchorEl(e.target);

  const handleClose = () => setAnchorEl(null);

  const logoutUser = async () => {
    await logout();

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
          logout={logoutUser}
        />
        <Typography variant="h1" className={classes.headingText}>
          Chats
        </Typography>
        <Search
          userList={userList}
          setUserList={setUserList}
          conversations={conversations}
          setConversation={setConversation}
          getConversation={getConvo}
          user={user}
        />
      </Box>
      <ConvoUserList
        conversations={conversations}
        conversation={conversation}
        user={user}
        setConversation={setConversation}
        setConvoLoading={setConvoLoading}
        getConversation={getConvo}
      />
    </Box>
  );
};

export default Sidebar;
