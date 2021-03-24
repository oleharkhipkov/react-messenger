import React, { useState, useEffect } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme.js';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { UserContext } from './context/UserContext';
import axios from 'axios';
import './App.css';
import PrivateRoute from './routing/PrivateRoute';
import NotFound from './layout/NotFound';

function App() {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const { data } = await axios.get('/auth/user');
        setUser(data.user);
      } catch (error) {
        console.log(error);
      }
      setUserLoading(false);
    }
    loadUser();
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <UserContext.Provider value={{ user, setUser }}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
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
