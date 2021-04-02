import React, { useContext, useEffect } from 'react';
import { Button, TextField, Box, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { UserContext } from '../context/UserContext';
import LandingLayout from '../layout/LandingLayout';
import SnackbarAlert from '../components/SnackbarAlert';
import LandingLinks from '../components/LandingLinks';
import LandingWelcome from '../components/LandingWelcome';
import { useRegister } from '../actions/auth';
import { useStyles } from '../styles/Signup';

export default function Register({ error, setError, showError, setShowError }) {
  const classes = useStyles();
  const history = useHistory();
  const register = useRegister();

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user) history.push('/home');
  }, [history, user]);

  return (
    <LandingLayout>
      <Box className={classes.buttonHeader}>
        <LandingLinks
          noAcctBtnText="Already have an account?"
          acctBtnText="Login"
          route="/login"
        />
        <Box width="100%" maxWidth={450} p={3} alignSelf="center">
          <LandingWelcome welcomeText="Create an account" />
          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string()
                .required('Username is required')
                .max(40, 'Username is too long'),
              email: Yup.string()
                .required('Email is required')
                .email('Email is not valid'),
              password: Yup.string()
                .required('Password is required')
                .max(100, 'Password is too long')
                .min(6, 'Password too short'),
            })}
            onSubmit={({ username, email, password }, { setSubmitting }) => {
              setSubmitting(true);
              register(username, email, password).then(
                (data) => {
                  setSubmitting(false);
                  setUser(data.user);
                  history.push('/home');
                },
                (err) => {
                  setSubmitting(false);
                  setError(err.message);
                  setShowError(true);
                }
              );
            }}
          >
            {({ handleChange, values, isSubmitting, touched, errors }) => (
              <Form className={classes.form} noValidate>
                <TextField
                  id="username"
                  label={
                    <Typography className={classes.label}>Username</Typography>
                  }
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{ classes: { input: classes.inputs } }}
                  name="username"
                  autoComplete="username"
                  autoFocus
                  helperText={touched.username ? errors.username : ''}
                  error={touched.username && Boolean(errors.username)}
                  value={values.username}
                  onChange={handleChange}
                />
                <TextField
                  id="email"
                  label={
                    <Typography className={classes.label}>
                      E-mail address
                    </Typography>
                  }
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{ classes: { input: classes.inputs } }}
                  name="email"
                  autoComplete="email"
                  helperText={touched.email ? errors.email : ''}
                  error={touched.email && Boolean(errors.email)}
                  value={values.email}
                  onChange={handleChange}
                />
                <TextField
                  id="password"
                  label={
                    <Typography className={classes.label}>Password</Typography>
                  }
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    classes: { input: classes.inputs },
                  }}
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  helperText={touched.password ? errors.password : ''}
                  error={touched.password && Boolean(errors.password)}
                  value={values.password}
                  onChange={handleChange}
                />
                <Box textAlign="center">
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    size="large"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Create
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
        <Box p={1} alignSelf="center" />
      </Box>
      <SnackbarAlert
        error={error}
        showError={showError}
        setShowError={setShowError}
      />
    </LandingLayout>
  );
}
