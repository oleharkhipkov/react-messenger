import React from 'react';
import { Box, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useStyles } from '../styles/LandingLinks';

const LandingLinks = ({ noAcctBtnText, acctBtnText, route }) => {
  const classes = useStyles();

  return (
    <Box
      p={1}
      className={classes.acctLinks}
      alignSelf="flex-end"
      alignItems="center"
    >
      <Box className={classes.link}>
        <Button className={classes.noAccBtn} component={Link} to={route}>
          {noAcctBtnText}
        </Button>
        <Button
          color="default"
          className={classes.accBtn}
          component={Link}
          to={route}
          variant="contained"
        >
          {acctBtnText}
        </Button>
      </Box>
    </Box>
  );
};

export default LandingLinks;
