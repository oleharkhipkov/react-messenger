import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
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
      <Link to={route} className={classes.link}>
        <Button className={classes.noAccBtn}>{noAcctBtnText}</Button>
        <Button color="default" className={classes.accBtn} variant="contained">
          {acctBtnText}
        </Button>
      </Link>
    </Box>
  );
};

export default LandingLinks;
