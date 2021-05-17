import React from 'react';
import landingStyles from './Landing.module.scss';
import Login from '../components/Login';

const Landing = () => {
  return (
    <main>
      <section>
        <Login />
      </section>
      <div className={landingStyles.fill}></div>
    </main>
  );
};

export default Landing;
