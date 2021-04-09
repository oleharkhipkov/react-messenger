import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import { useStyles } from '../styles/SearchResults';

const SearchResults = ({ userSearchList, attemptConvoStart }) => {
  const classes = useStyles();

  return userSearchList.map((u) => (
    <Box
      className={classes.searchResultItem}
      key={u._id}
      onClick={() => attemptConvoStart(u._id)}
    >
      <Avatar>{u.username.substring(0, 2)}</Avatar>
      <Box className={classes.searchResultItemText}>{u.username}</Box>
    </Box>
  ));
};

export default SearchResults;
