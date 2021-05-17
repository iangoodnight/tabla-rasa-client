/*
 * Login component
 */

import React, { useState } from 'react';
import loginStyles from './Login.module.scss';

const Login = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  }

  return(
    <form onSubmit={handleSubmit}>
      <div className={loginStyles.head}>
        <h1>Welcome</h1>
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          onChange={handleChange}
          type="text"
          value={form.username}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          onChange={handleChange}
          type="email"
          value={form.email}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          onChange={handleChange}
          type="password"
          value={form.password}
        />
      </div>
      <div className={loginStyles.submit}>
        <button type="submit">Log in</button>
      </div>
    </form>
  );
};

export default Login;
