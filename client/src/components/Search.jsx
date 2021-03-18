import React, { useEffect, useState, useRef } from 'react';
import SearchResults from './SearchResults';
import NoUsersFound from './NoUsersFound';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Box from '@material-ui/core/Box';
import { useSearchUsers } from '../actions/user';
import { useStartConversation } from '../actions/messages';
import { useStyles } from '../styles/Search';

export default function Search({
  setUserList,
  userList,
  conversations,
  user,
  handleGetConversation,
  setError,
  setShowError,
}) {
  const classes = useStyles();
  const [searchString, setSearchString] = useState('');
  const [wasSearched, setWasSearched] = useState(false);

  const searchUsers = useSearchUsers();
  const startConversation = useStartConversation();

  const timeOut = useRef(null);

  useEffect(() => {
    clearTimeout(timeOut.current);
    if (searchString !== '') {
      timeOut.current = setTimeout(() => {
        handleSearch();
      }, 250);
    } else {
      setUserList([]);
      setWasSearched(false);
    }
    // eslint-disable-next-line
  }, [searchString]);

  const handleSearch = async () => {
    try {
      const data = await searchUsers(searchString);
      setUserList(data);
      setWasSearched(true);
    } catch (err) {
      setError(err.message);
      setShowError(true);
    }
  };

  const handleChange = (e) => {
    setSearchString(e.target.value);
  };

  const handleStartConversation = async (userId) => {
    try {
      const data = await startConversation(userId);

      handleGetConversation(data._id);
    } catch (err) {
      setError(err.message);
      setShowError(true);
    }
  };

  const attemptConvoStart = (userId) => {
    let match = false;
    for (let convo of conversations) {
      const convoExists = convo.users.filter(
        (u) => u._id === userId || u._id === user._id
      )[0];

      if (convoExists) {
        match = true;
        handleGetConversation(convo._id);
        break;
      }
    }
    if (match === false) {
      handleStartConversation(userId);
    }
    setSearchString('');
    setWasSearched(false);
  };

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
        onChange={(e) => handleChange(e)}
      />
      {wasSearched ? (
        <Box className={classes.searchResultsContainer}>
          {userList.length > 0 ? (
            <SearchResults
              userList={userList}
              attemptConvoStart={attemptConvoStart}
            />
          ) : (
            <NoUsersFound />
          )}
        </Box>
      ) : null}
    </>
  );
}
