// src/components/auth/LoginPage/SignUpForm/SignUpForm.js

// import css
import './SignUpForm.css';

// import react
import React, { useState } from 'react';

// import react-redux
import { useSelector, useDispatch } from 'react-redux';

// import react-router-dom
import { NavLink, Redirect } from 'react-router-dom';

// import store
import { signUp } from '../../../../store/session';
import { login } from '../../../../store/session';

//? SignUpForm component
const SignUpForm = () => {
	/**
	 * Controlled Inputs
	 */
	const [errors, setErrors] = useState([]);
	const [first_name, setFirstName] = useState('');
	const [last_name, setLastName] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	// function for handling sign up
	const onSignUp = async (e) => {
		e.preventDefault();
		if (password === repeatPassword) {
			await dispatch(
				signUp(first_name, last_name, username, email, password)
			).catch((res) => {
				setErrors(res);
			});
		}
	};

	// function to handle login demo user
	const handleDemoLogin = async (e) => {
		e.preventDefault();
		// if demo is selected, use demo log in
		// otherwise, use the given email and password to log in
		const data = await dispatch(login('demo@aa.io', 'password'));

		// catch any error from data
		if (data) {
			setErrors(data);
		}
	};

	// function to update first name
	const updateFirstName = (e) => {
		setFirstName(e.target.value);
	};

	// function to update last name
	const updateLastName = (e) => {
		setLastName(e.target.value);
	};

	// function to update user name
	const updateUsername = (e) => {
		setUsername(e.target.value);
	};

	// function to update email
	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	// function to update password
	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	// function to update password confirmation
	const updateRepeatPassword = (e) => {
		setRepeatPassword(e.target.value);
	};

	//? if user exist in session, just go to homepage
	if (user) {
		return <Redirect to='/' />;
	}

	return (
		<form onSubmit={onSignUp} id='signup-form'>
			<div className='login-error-container'>
				{errors.map((error, ind) => (
					<div key={ind}>{error}</div>
				))}
			</div>
			<div id='su-fn-ln-container'>
				<div id='su-fn-container'>
					<label>First Name</label>
					<input
						type='text'
						name='first_name'
						placeholder='First Name'
						onChange={updateFirstName}
						value={first_name}
					></input>
				</div>
				<div id='su-ln-container'>
					<label>Last Name</label>
					<input
						type='text'
						name='last_name'
						placeholder='Last Name'
						onChange={updateLastName}
						value={last_name}
					></input>
				</div>
			</div>
			<div id='su-un-container'>
				<label>User Name (Optional)</label>
				<input
					type='text'
					name='username'
					placeholder='Username'
					onChange={updateUsername}
					value={username}
				></input>
			</div>
			<div id='su-em-container'>
				<label>Email</label>
				<input
					type='text'
					name='email'
					placeholder='name@work-email.com'
					onChange={updateEmail}
					value={email}
				></input>
			</div>
			<div id='su-pw-container'>
				<label>Password</label>
				<input
					type='password'
					name='password'
					placeholder='Your password'
					onChange={updatePassword}
					value={password}
				></input>
			</div>
			<div id='su-cpw-container'>
				<label>Repeat Password</label>
				<input
					type='password'
					name='repeat_password'
					placeholder='Confirm password'
					onChange={updateRepeatPassword}
					value={repeatPassword}
					required={true}
				></input>
			</div>
			<button type='submit' id='su-sm-button'>
				Sign Up
			</button>
			<button className='su-demo-user-button' onClick={handleDemoLogin}>
				Demo User
			</button>
			<p id='su-login-p'>
				Already have an account?
				<NavLink to='/login' id='su-login-p-link'>
					Log in here
				</NavLink>
			</p>
		</form>
	);
};

// export component
export default SignUpForm;
