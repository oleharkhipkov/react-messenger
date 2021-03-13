import React, { useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import { useHistory } from 'react-router-dom';
import Search from './Search';
import ConvoUserList from './ConvoUserList';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Please from 'pleasejs';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const useStyles = makeStyles((theme) => ({
  sidebarHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '70px',
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
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

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

  const handleClick = (e) => {
    setAnchorEl(e.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async () => {
    await axios.get('/auth/logout');

    history.push('/login');
    setUser(null);
  };

  return (
    <div style={{ padding: '0px 1rem' }}>
      <div>
        <div className={classes.sidebarHeader}>
          <div style={{ fontSize: '20px' }}>
            {currentUser && loggedInUser()}
          </div>
          <IconButton
            aria-controls="customized-menu"
            aria-haspopup="true"
            edge="end"
            onClick={handleClick}
          >
            <MoreHorizIcon style={{ color: '#95A7C4' }} />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {' '}
            <MenuItem onClick={() => logout()}>Logout</MenuItem>
          </Menu>
        </div>
        <h1 style={{ fontSize: '20px', letterSpacing: '-0.29px' }}>Chats</h1>
        <Search
          userList={userList}
          setUserList={setUserList}
          conversations={conversations}
          setConversation={setConversation}
          getConversation={getConversation}
          user={currentUser}
        />
      </div>
      <div style={{ height: '70vh', overflowY: 'auto' }}>
        <ConvoUserList
          conversations={conversations}
          conversation={conversation}
          user={currentUser}
          setConversation={setConversation}
          setConvoLoading={setConvoLoading}
          getConversation={getConversation}
        />
      </div>
    </div>
  );
};

export default Sidebar;
