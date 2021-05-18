import React from 'react';
import landingStyles from './Landing.module.scss';
import Login from '../components/Login';

const Landing = ({ setToken }) => {
  return (
    <main>
      <section>
        <Login setToken={setToken} />
      </section>
      <div className={landingStyles.fill}></div>
    </main>
  );
};

export default Landing;
