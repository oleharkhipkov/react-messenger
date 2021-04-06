import React from 'react';
import { Box, Hidden, Grid, Paper, CssBaseline } from '@material-ui/core';
import { useStyles } from '../styles/LandingLayout';

const LandingLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={false} md={5} className={classes.image}>
        <Box className={classes.overlay}>
          <Hidden smDown>
            <img width={67} src="/images/chatBubble.png" alt="chat bubble" />
            <Hidden smDown>
              <p className={classes.heroText}>
                Converse with anyone with any language
              </p>
            </Hidden>
          </Hidden>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={7} elevation={6} component={Paper} square>
        {children}
      </Grid>
    </Grid>
  );
};

export default LandingLayout;
