import React, { useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import { useHistory } from 'react-router-dom';
import Search from './Search';
import ConvoUserList from './ConvoUserList';
import SidebarHeader from './SidebarHeader';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Please from 'pleasejs';

const useStyles = makeStyles((theme) => ({
  sidebarContainer: {
    padding: '0px 1rem',
    display: 'flex',
    flexDirection: 'column',
    height: '95vh',
    [theme.breakpoints.down('xs')]: {
      padding: '0px',
    },
  },
  sidebarHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: '70px',
    padding: '0px 20px 0px 10px',
    alignItems: 'center',
  },
  userImg: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    marginRight: '10px',
    backgroundColor: Please.make_color(),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    fontSize: '20px',
    letterSpacing: '-0.29px',
  },
}));

const Sidebar = ({
  userList,
  setUserList,
  conversations,
  currentUser,
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
      <div className={classes.userImg}>
        <p>{currentUser.username.substring(0, 2).toUpperCase()}</p>
      </div>
      <Box>
        <p>{currentUser.username}</p>
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
    <div className={classes.sidebarContainer}>
      <div style={{ position: 'relative' }}>
        <SidebarHeader
          currentUser={currentUser}
          loggedInUser={loggedInUser}
          handleClick={handleClick}
          anchorEl={anchorEl}
          handleClose={handleClose}
          logout={logout}
        />
        <h1 className={classes.headingText}>Chats</h1>
        <Search
          userList={userList}
          setUserList={setUserList}
          conversations={conversations}
          setConversation={setConversation}
          getConversation={getConversation}
          user={currentUser}
        />
      </div>
      <ConvoUserList
        conversations={conversations}
        conversation={conversation}
        user={currentUser}
        setConversation={setConversation}
        setConvoLoading={setConvoLoading}
        getConversation={getConversation}
      />
    </div>
  );
};

export default Sidebar;
