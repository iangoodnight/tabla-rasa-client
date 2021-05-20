import React, { useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';
import Landing from './pages/Landing';
import Loader from './components/Loader';
import Dashboard from './pages/Dashboard';
import Protected from './pages/Protected';

const App = () => {
  const [userContext, setUserContext] = useContext(UserContext);

  const verifyUser = useCallback(async () => {
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3001/api/auth/refresh',
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      const { data: { success, token } } = response;
      console.log(response.data);
      if (!success) {
        setUserContext(oldVals => {
          return { ...oldVals, token: null };
        });
      } else {
        setUserContext(oldVals => {
          return { ...oldVals, token };
        });
      }
      // set timeout to refresh
      setTimeout(verifyUser, (5 * 60 * 1_000));
    } catch (err) {
      console.log(err);
      setUserContext(oldVals => {
        return { ...oldVals, token: null };
      });
    }
  }, [setUserContext]);

  useEffect(() => verifyUser(), [verifyUser]);
  console.log(userContext);
  return  userContext.token === null ? (
    <div className="App">
      <Landing />
    </div>
  ) : userContext.token ? (
    <Dashboard />
  ) : (
    <Loader />
  );
}

export default App;
