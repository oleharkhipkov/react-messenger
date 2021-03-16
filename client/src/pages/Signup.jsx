import React, { useContext, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../UserContext';
import LandingLayout from '../layout/LandingLayout';
import LandingSnackbar from '../components/LandingSnackbar';
import LandingLinks from '../components/LandingLinks';
import LandingWelcome from '../components/LandingWelcome';
import { useRegister } from '../actions/authActions';

const useStyles = makeStyles((theme) => ({
  buttonHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    bgcolor: 'background.paper',
    minHeight: '100vh',
    paddingTop: 23,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  label: { fontSize: 19, color: 'rgb(0,0,0,0.4)', paddingLeft: '5px' },
  submit: {
    margin: theme.spacing(3, 2, 2),
    padding: 10,
    width: 160,
    height: 56,
    borderRadius: 3,
    marginTop: 49,
    fontSize: 16,
    backgroundColor: '#3a8dff',
    fontWeight: 'bold',
  },
  inputs: {
    marginTop: '.8rem',
    height: '2rem',
    padding: '5px',
  },
}));

export default function Register() {
  const classes = useStyles();
  const history = useHistory();
  const register = useRegister();

  const { user, setUser } = useContext(UserContext);

  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) history.push('/home');
  }, [history, user]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

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
                  setOpen(true);
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
      <LandingSnackbar open={open} handleClose={handleClose} error={error} />
    </LandingLayout>
  );
}
