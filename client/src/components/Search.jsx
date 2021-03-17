import React, { useEffect, useState, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import { useStyles } from '../styles/Search';

export default function Search({
  setUserList,
  userList,
  conversations,
  user,
  getConversation,
}) {
  const classes = useStyles();
  const [searchString, setSearchString] = useState('');
  const [wasSearched, setWasSearched] = useState(false);
  const timeOut = useRef(null);

  useEffect(() => {
    clearTimeout(timeOut.current);
    if (searchString !== '') {
      timeOut.current = setTimeout(() => {
        search();
      }, 250);
    } else {
      setUserList([]);
      setWasSearched(false);
    }
    // eslint-disable-next-line
  }, [searchString]);

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
      setWasSearched(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    setSearchString(e.target.value);
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

  const attemptConvoStart = (userId) => {
    let match = false;
    for (let convo of conversations) {
      const convoExists = convo.users.filter(
        (u) => u._id === userId || u._id === user._id
      )[0];

      if (convoExists) {
        match = true;
        getConversation(convo._id);
        break;
      }
    }
    if (match === false) {
      startConversation(userId);
    }
    setSearchString('');
    setWasSearched(false);
  };

  const searchResults = () =>
    userList.map((u) => (
      <div
        className={classes.searchResultItem}
        key={u._id}
        onClick={() => attemptConvoStart(u._id)}
      >
        <Avatar>{u.username.substring(0, 2)}</Avatar>
        <div className={classes.searchResultItemText}>{u.username}</div>
      </div>
    ));

  const noResults = (
    <div className={classes.searchResultItem}>
      There were no users found in your search please try again
    </div>
  );

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
        onChange={(e) => handleSearch(e)}
      />
      {wasSearched ? (
        <div className={classes.searchResultsContainer}>
          {userList.length > 0 ? searchResults() : noResults}
        </div>
      ) : null}
    </>
  );
}
