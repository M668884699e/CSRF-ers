/* --------- ACTIONS -------- */
// action
const LOAD_USERS = 'users/LOAD_USERS';

// action creator: load all users
const loadUsers = users => {
  return {
    type: LOAD_USERS,
    users
  }
}

//? Action: Delete user
// action
const DELETE_USER = 'users/DELETE_USER';

// action creator: remove user from list of users
export const deleteUser = () => {
  return {
    type: DELETE_USER
  }
}

/* --------- THUNKS -------- */
//? Thunk action to get all users
export const thunkGetAllUsers = () => async dispatch => {
  // fetch all users
  const res = await fetch('/api/users/');

  if (res.ok) {
    // parse res to users data
    const userData = await res.json();

    // dispatch load users w/ loaded users
    dispatch(loadUsers(userData.users));

    // return users
    return userData;
  }

  // return res if unsuccessful
  return res;
}

//? Thunk action to delete user by id
export const thunkDeleteUser = () => async dispatch => {
  // fetch to delete user
  const res = await fetch('/api/users/', {
    method: 'DELETE'
  });

  // if successful response
  if (res.ok) {
    const deletedUser = await res.json();

    // dispatch deleteUser
    dispatch(deleteUser());
    
    return deletedUser;
  }
}

/* --------- SELECTOR FUNCTIONS -------- */
export const getAllUsers = state => state.users;
export const getUserById = (state, userId) => state.users.find(user => user === userId);

/* --------- REDUCERS -------- */
const initialState = {};

export default function userReducer(state = initialState, action) {
  const newUsers = { ...state };

  switch (action.type) {
    //? default case
    default:
      return Object.assign({}, newUsers, action.users);
  }
}
