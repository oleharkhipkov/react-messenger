import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useStyles } from '../styles/LandingWelcome';

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
