import React, { useCallbck, useContext, useEffect, useState } from 'react';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Protected from './pages/Protected';

const App = () => {
  const [userContext, setUserContext] = useContext(UserContext);

  console.log(userContext);
  return (
    <div className="App">
      {!userContext.token ? <Landing /> : <Dashboard />}
    </div>
  );
}

export default App;
