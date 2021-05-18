import React, { useEffect, useState, createContext } from 'react';

export const AuthContext = createContext();

export default ({ children }) => {
  const prevAuth = window.localStorage.getItem('auth') || false;
  const prevAuthBody = window.localStorage.getItem('authBody') || null;
  const [authenticated, setAuthenticated] = useState(prevAuth);
  const [authBody, setAuthBody] = useState(prevAuthBody);

  useEffect(
    () => {
      window.localStorage.setItem('authenticated', authenticated);
      window.localStorage.setItem('authBody', authBody);
    },
    [authenticated, authBody]
  );

  const defaultContext = {
    authenticated,
    setAuthenticated,
    authBody,
    setAuthBody,
  };

  return (
    <AuthContext.Provider value={defaultContext}>
      {children}
    </AuthContext.Provider>
  );
};
