import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import * as sessionActions from '../store/session'
import Editor from './Editor';

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const currentUserId = useSelector(state => state.session.user.id);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  const logout = e => {
    e.preventDefault();
    dispatch(sessionActions.logout())
    .then(history.push('/'));
  }

  if (!user) {
    return null;
  }

  return (
    <>  
      <ul>
        <li>
          <strong>User Id</strong> {userId}
        </li>
        <li>
          <strong>Username</strong> {user.display_name}
        </li>
        <li>
          <strong>Email</strong> {user.email}
        </li>
      </ul>
      {(Number(userId) === currentUserId) && (
        <button id='button-logout' onClick={logout}>Log Out</button>
      )}
      <Editor />
    </>
  );
}
export default User;
