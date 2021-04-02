import React from 'react';
import Box from '@material-ui/core/Box';
import { useStyles } from '../styles/NoUsersFound';

const NoUsersFound = () => {
  const classes = useStyles();

  return (
    <Box className={classes.searchResultItem}>
      There were no users found in your search please try again
    </Box>
  );
};

export default NoUsersFound;
