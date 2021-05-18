import React, { useState } from 'react';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Protected from './pages/Protected';

const App = () => {
  const [token, setToken] = useState();

  if (!token) {
    return <Landing setToken={setToken} />;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/secret">
            <Protected />
          </Route>
          <Route path="/login">
            <Landing />
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
