import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../UserContext';
import axios from 'axios';

export default function Dashboard() {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!user) history.push('/signup');
  }, [user, history]);

  // add this route to the backend
  const logout = async () => {
    return axios.get('/logout');
  };

  return (
    <>
      {/* This will be Main Chat page */}
      <p>Dashboard</p>
      <p>User: {JSON.stringify(user, null, 2)}</p>
      <button
        onClick={() => {
          logout().then(() => {
            setUser(null);
            history.push('/login');
          });
        }}
      >
        Logout
      </button>
    </>
  );
}
