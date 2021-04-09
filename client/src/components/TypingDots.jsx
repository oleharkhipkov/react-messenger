import React from 'react';
import Box from '@material-ui/core/Box';
import { useStyles } from '../styles/TypingDots';

const TypingDots = () => {
  const classes = useStyles();
  return (
    <Box className={classes.messageBubbleLeft}>
      <Box className={classes.dot}></Box>
      <Box className={classes.dot}></Box>
      <Box className={classes.dot}></Box>
    </Box>
  );
};

export default TypingDots;
