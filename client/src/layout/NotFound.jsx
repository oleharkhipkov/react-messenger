import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { useStyles } from '../styles/NotFound';

const NotFound = () => {
  const classes = useStyles();

  return (
    <Box className={classes.notFound}>
      <Typography className={classes.notFoundHeading}>
        Sorry, that page cannot be found – it's a big 404. But Hatchways is
        still pretty cool, right?
      </Typography>
      <Typography className={classes.notFoundText}>
        Click <Link to="/">here</Link> to return to the home page.{' '}
      </Typography>
    </Box>
  );
};

export default NotFound;
