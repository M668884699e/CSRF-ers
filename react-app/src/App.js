import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginPage from './components/auth/LoginPage';
import SignUpForm from './components/auth/LoginPage/SignupForm/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import LandingPage from './components/LandingPage/'
import MessagePage from './components/MessagePage/';
import LandingProvider, { LandingContext } from './context/LandingContext';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
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
        <Route path='/login' exact={true}>
          <LoginPage />
        </Route>
        <Route path='/sign-up' exact={true}>
          <LoginPage />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          {/* <h1>My Home Page</h1> */}
          <LandingProvider>
            <LandingPage loaded={loaded} />
          </LandingProvider>
        </ProtectedRoute>

        <Route path ="/test" exact={true}>
          <MessagePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
