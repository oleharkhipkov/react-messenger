import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  acctLinks: {
    [theme.breakpoints.down('xs')]: {
      alignSelf: 'center',
    },
  },
  link: { textDecoration: 'none', display: 'flex', flexWrap: 'nowrap' },
  accBtn: {
    width: 170,
    height: 54,
    borderRadius: 5,
    filter: 'drop-shadow(0px 2px 6px rgba(74,106,149,0.2))',
    backgroundColor: '#ffffff',
    color: '#3a8dff',
    boxShadow: 'none',
    marginRight: 35,
  },
  noAccBtn: {
    fontSize: 14,
    color: '#b0b0b0',
    fontWeight: 400,
    textAlign: 'center',
    marginRight: 21,
    whiteSpace: 'nowrap',
  },
}));

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
