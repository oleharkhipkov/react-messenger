import React, { useState, useEffect } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme.js';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { useLoadUser } from './actions/auth';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { UserContext } from './context/UserContext';
import './App.css';
import PrivateRoute from './routing/PrivateRoute';
import NotFound from './layout/NotFound';

function App() {
  const loadUser = useLoadUser();
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function handleLoadUser() {
      try {
        const data = await loadUser();
        setUser(data.user);
      } catch (err) {
        if (err.message === 'Server Error') {
          setError('Server error, failed to load user');
          setShowError(true);
        } else {
          setShowError(false);
        }
      }
      setUserLoading(false);
    }
    handleLoadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <UserContext.Provider value={{ user, setUser }}>
          <Switch>
            <Route
              path="/login"
              render={(props) => (
                <Login
                  {...props}
                  error={error}
                  setError={setError}
                  showError={showError}
                  setShowError={setShowError}
                />
              )}
            />
            <Route
              path="/signup"
              render={(props) => (
                <Signup
                  {...props}
                  error={error}
                  setError={setError}
                  showError={showError}
                  setShowError={setShowError}
                />
              )}
            />
            <PrivateRoute
              path="/home"
              component={Home}
              userLoading={userLoading}
            />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </UserContext.Provider>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
