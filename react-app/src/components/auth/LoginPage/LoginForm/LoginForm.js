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

  // function to handle login
  const onLogin = async (e, demo) => {
    e.preventDefault();
    // if demo is selected, use demo log in
    // otherwise, use the given email and password to log in
    const data = demo ?
      await dispatch(login("demo@aa.io", "password"))  
      :
      await dispatch(login(email, password));
    
    // catch any error from data
    if (data) {
      setErrors(data);
    }
  };

  // function to update email
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  // function to update password 
  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  // if user is already log in, navigate directly to home page
  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onLogin} id="login-form">
      <div className="login-error-container">
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
      <button
        className="demo-user-button"
        onClick={e => onLogin(e, true)}
      >
        Demo User
      </button>
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
