import React, { useContext, useState, useEffect } from 'react';
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
import SnackbarAlert from '../components/SnackbarAlert';
import LandingLinks from '../components/LandingLinks';
import LandingWelcome from '../components/LandingWelcome';
import { useLogin } from '../actions/auth';

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
    fontWeight: 'bold',
    backgroundColor: '#3a8dff',
  },
  inputs: {
    marginTop: '.8rem',
    height: '2rem',
    padding: '5px',
  },
  forgot: {
    paddingRight: 10,
    color: '#3a8dff',
  },
}));

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const login = useLogin();

  const { user, setUser } = useContext(UserContext);

  const [showError, setShowError] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) history.push('/home');
  }, [history, user]);

  return (
    <LandingLayout>
      <Box className={classes.buttonHeader}>
        <LandingLinks
          noAcctBtnText="Dont have an account?"
          acctBtnText="Create account"
          route="/signup"
        />
        <Box width="100%" maxWidth={450} p={3} alignSelf="center">
          <LandingWelcome welcomeText="Welcome back!" />
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .required('Email is required')
                .email('Email is not valid'),
              password: Yup.string()
                .required('Password is required')
                .max(100, 'Password is too long')
                .min(6, 'Password too short'),
            })}
            onSubmit={({ email, password }, { setSubmitting }) => {
              setSubmitting(true);
              login(email, password).then(
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
                  id="email"
                  label={<p className={classes.label}>E-mail address</p>}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{ classes: { input: classes.inputs } }}
                  name="email"
                  autoComplete="email"
                  autoFocus
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
                    endAdornment: (
                      <Typography className={classes.forgot}>
                        Forgot?
                      </Typography>
                    ),
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
                    Login
                  </Button>
                </Box>

                <div style={{ height: 95 }} />
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
