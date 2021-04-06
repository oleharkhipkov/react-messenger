import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useStyles } from '../styles/LandingWelcome';

const LandingWelcome = ({ welcomeText }) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs>
        <Typography className={classes.welcome}>{welcomeText}</Typography>
      </Grid>
    </Grid>
  );
};

export default LandingWelcome;
