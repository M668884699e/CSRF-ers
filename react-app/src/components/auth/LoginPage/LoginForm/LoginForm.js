// src/components/auth/LoginPage/LoginForm/LoginForm.js

// import css
import './LoginForm.css';

// import react
import React, { useState } from 'react';

// import react-redux
import { useSelector, useDispatch } from 'react-redux';

// import react-router-dom
import { NavLink, Redirect } from 'react-router-dom';

// import store
import { login } from '../../../../store/session';

//? LoginForm component
const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onLogin} id="login-form">
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div id="login-email-container">
        <label htmlFor='email'>Email address</label>
        <input
          name='email'
          type='text'
          placeholder='name@work-email.com'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div id="login-password-container">
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          placeholder='Your password'
          value={password}
          onChange={updatePassword}
        />
      </div>
      <button id="login-button" type='submit'>Sign In</button>
      <p id="login-signup-p">
        Don't have an account?
        <NavLink to="/sign-up" id="login-signup-p-link">
          Sign up here
        </NavLink>
      </p>
    </form>
  );
};

export default LoginForm;
