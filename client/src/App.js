import React, { useState, useEffect } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme.js';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { UserContext } from './UserContext';
import axios from 'axios';

import './App.css';

function App() {
  const [user, setUser] = useState(null);

  // add this route to backend
  useEffect(() => {
    async function loadUser() {
      const { data } = await axios.get('/auth/user');

      setUser(data.user);
    }
    loadUser();
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser }}>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/home" component={Home} />
        </UserContext.Provider>
        <Route exact path="/">
          <Redirect to="/signup" />
        </Route>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
