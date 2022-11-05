// import context
import LandingProvider from './context/LandingContext';

// import component
import LandingPage from './components/LandingPage';
import MessagePage from './components/MessagePage';
import LoginPage from './components/auth/LoginPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';

// import react-redux
import { useDispatch } from 'react-redux';

// import react
import React, { useState, useEffect } from 'react';

// import react-router-dom
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import store
import { authenticate } from './store/session';
import StartPage from './components/StartPage';
import StarterProvider from './context/StarterContext';
import ProfileProvider from './context/ProfileContext';
import MessageProvider from './context/MessageContext';

//? App Component
function App() {
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			await dispatch(authenticate());
			setLoaded(true);
		})();
	}, [dispatch]);

	if (!loaded) {
		return null;
	}

	return (
		<BrowserRouter>
			{/* <NavBar /> */}
			<Switch>
				{/* //? Login Route */}
				<Route path='/login' exact={true}>
					<LoginPage />
				</Route>
				{/* //? Sign Up Route */}
				<Route path='/sign-up' exact={true}>
					<LoginPage />
				</Route>

				{/* //?  Getting Started Page Route */}
				<ProtectedRoute path='/start/setup'>
					<StarterProvider>
						<StartPage />
					</StarterProvider>
				</ProtectedRoute>

				<ProtectedRoute path='/users' exact={true}>
					<UsersList />
				</ProtectedRoute>
				<ProtectedRoute path='/users/:userId' exact={true}>
					<User />
				</ProtectedRoute>

				{/* //? Main Route */}
				<ProtectedRoute path='/' exact={true}>
					{/* <h1>My Home Page</h1> */}
					<LandingProvider>
						<LandingPage loaded={loaded} />
					</LandingProvider>
				</ProtectedRoute>

				{/* //? Chatroom Route */}
				<Route path='/chat/channels/:channelId' exact={true}>
					<MessageProvider>
						<MessagePage />
					</MessageProvider>
				</Route>

				{/* //? DMR Route */}
				<Route path='/chat/dmr/:dmrId' exact={true}>
					<MessageProvider>
						<MessagePage />
					</MessageProvider>
				</Route>

				{/* //? 404 Route */}
				<Route>404 Page Not Found</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
