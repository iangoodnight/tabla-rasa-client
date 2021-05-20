/*
 * Login component
 */

import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import loginStyles from './Login.module.scss';
import auth from '../services/auth.service';

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState('');
  const [error, setError] = useState('');
  const [userContext, setUserContext] = useContext(UserContext);
  const [form, setForm] = useState({
    username: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    const { success, token } = await auth.login(form)
    if (success) setUserContext(context => { return { ...context, token }});
    if (!success) setError('Something went wrong');
    setIsSubmitting(false);
    console.log(error)
    console.log(token);
    console.log(userContext);
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
