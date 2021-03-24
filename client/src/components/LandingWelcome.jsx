import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useStyles } from '../styles/LandingWelcome';

const LandingLinks = ({ welcomeText }) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs>
        <Typography className={classes.welcome} component="h1" variant="h5">
          {welcomeText}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LandingLinks;
