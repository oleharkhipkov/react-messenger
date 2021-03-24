import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Box, CircularProgress } from '@material-ui/core';
import { UserContext } from '../UserContext';
import { useStyles } from '../styles/PrivateRoute';

const PrivateRoute = ({ component: Component, userLoading, ...rest }) => {
  const classes = useStyles();
  const { user } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        userLoading ? (
          <Box className={classes.privateRoute}>
            <CircularProgress />
          </Box>
        ) : user ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
