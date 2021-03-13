import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  search: {
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#ffffff',
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: '1px solid white',
    },
  },
  searchInput: {
    height: '50px',
    borderRadius: '8px',
    backgroundColor: '#e9eef9',
    display: 'flex',
    paddingLeft: '20px',
    alignItems: 'center',
  },
  searchIcon: {
    color: '#b1c3df',
    marginRight: '6px',
  },
  searchResultsContainer: {
    position: 'absolute',
    zIndex: '2',
  },
  searchResultItem: {
    border: '1px solid black',
    backgroundColor: '#fff',
    padding: '1rem',
    width: '150px',
    '&:hover': { backgroundColor: 'lightGray' },
  },
}));

export default function Search({
  setUserList,
  userList,
  conversations,
  user,
  getConversation,
}) {
  const classes = useStyles();
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    if (searchString !== '') {
      search();
    } else {
      setUserList([]);
    }
  }, [searchString, setUserList]);

  const search = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const { data } = await axios.post(
        '/users',
        JSON.stringify({ searchString }),
        config
      );
      setUserList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    setSearchString(e);
  };

  const startConversation = async (userId) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/conversations',
      JSON.stringify({ user: userId }),
      config
    );
    getConversation(data._id);
  };

  const convoExists = (userId) => {
    let match = false;
    for (let convo of conversations) {
      if (
        convo.users.filter((u) => u._id === userId || u._id === user._id)[0]
      ) {
        match = true;
        getConversation(convo._id);
        break;
      }
    }
    if (match === false) {
      startConversation(userId);
    }
    setSearchString('');
  };

  const startConvo = (userId) => {
    convoExists(userId);
  };

  const showSearchResults = () =>
    userList.map((u) => (
      <div
        className={classes.searchResultItem}
        key={u._id}
        onClick={() => startConvo(u._id)}
      >
        {u.username}
      </div>
    ));

  return (
    <>
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Search..."
        className={classes.search}
        InputProps={{
          className: classes.searchInput,
          startAdornment: <SearchIcon className={classes.searchIcon} />,
        }}
        value={searchString}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {userList.length > 0 ? (
        <div className={classes.searchResultsContainer}>
          {showSearchResults()}
        </div>
      ) : null}
    </>
  );
}
