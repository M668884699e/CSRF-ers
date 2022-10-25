// src/components/auth/ProtectedRoute.js

import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = props => {
  const user = useSelector(state => state.sessions.user)
  return (
    <Route {...props}>
      {(user)? props.children  : <Redirect to='/login' />}
    </Route>
  )
};


export default ProtectedRoute;
