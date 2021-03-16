import React from 'react';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  welcome: {
    fontSize: 26,
    paddingBottom: 20,
    color: '#000000',
    fontWeight: 500,
  },
}));

const LandingLinks = ({ welcomeText }) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs>
        <p className={classes.welcome} component="h1" variant="h5">
          {welcomeText}
        </p>
      </Grid>
    </Grid>
  );
};

export default LandingLinks;
