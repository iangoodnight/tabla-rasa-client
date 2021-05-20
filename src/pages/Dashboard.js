import React, { useCallback, useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import Loader from '../components/Loader';

const Dashboard = () => {
  const [ userContext, setUserContext ] = useContext(UserContext);

  const fetchUserDetails = useCallback(async () => {
    // gotta make my mind up about these calls (axios vs fetch)
    // fetch with auth example for later
    try {
      const response = await fetch(
        process.env.REACT_APP_API_ENDPOINT + '/auth',
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userContext.token}`,
          },
        }
      );
      const { ok, status } = response;
      const data = await response.json();
      if (!ok) {
        setUserContext(oldVals => {
          return { ...oldVals, details: null };
        });
        if (status === 401) window.location.reload();
        return;
      }
      setUserContext(oldVals => {
        return { ...oldVals, details: data };
      });
    } catch (err) {
      console.log(err);
    }
  }, [setUserContext, userContext.token]);

  useEffect(() => {
    if (!userContext.details) fetchUserDetails();
  }, [userContext.details, fetchUserDetails]);

  const logoutHandler = async () => {
    const response = await fetch(
      process.env.REACT_APP_API_ENDPOINT + '/auth',
      {
        method: 'DELETE',
        credentials: 'include'
      },
    );
    setUserContext(oldVals => {
      return { ...oldVals, details: undefined, token: null };
    });
    window.localStorage.setItem('logout', Date.now());
  }
  const refetchHandler = () => {
    setUserContext(oldVals => {
      return { ...oldVals, details: undefined }
    });
  };


  return userContext.details === null ? (
    'Error loading details...'
  ) : !userContext.details ? (
    <Loader />
  ) : (
    <>
      <h1>DASHBOARD</h1>
      {userContext.details.user}
      <button onClick={logoutHandler}>logout</button>
    </>
  );
};

export default Dashboard;
