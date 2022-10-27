/* --------- ACTIONS -------- */
// action
const LOAD_USERS = 'users/LOAD_USERS';

// action creator:
const loadUsers = users => {
  return {
    type: LOAD_USERS,
    users
  }
}

/* --------- THUNKS -------- */
//? Thunk action to get all users
export const thunkGetUsers = () => async dispatch => {
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
}

/* --------- SELECTOR FUNCTIONS -------- */
export const getAllUsers = state => Object.values(state.users);

/* --------- REDUCERS -------- */
const initialState = {};

export default function userReducer(state = initialState, action) {
  const newUsers = { ...state };

  switch (action.type) {
    // default case
    default:
      return Object.assign({}, newUsers, action.users);
  }
}
