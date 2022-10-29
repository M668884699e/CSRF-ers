/* --------- ACTIONS -------- */
// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

/* --------- THUNKS -------- */

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/users/authenticate', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
  
    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (first_name, last_name, username, email, password) => async (dispatch) => {

  const response = await fetch('/api/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      first_name,
      last_name,
      username,
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

// thunk to update current session user information
export const thunkEditUser = userInfo => async dispatch => {
  // deconstruct userInfo into data
  const {
    first_name,
    last_name,
    username,
    email,
    // password,
    profile_image
  } = userInfo

  // define form data
  const formData = new FormData();

  console.log("test");
  
  // put userInfo into form data
  formData.append("first_name", first_name);
  formData.append("last_name", last_name);
  formData.append("username", username);
  formData.append("email", email);
  // formData.append("password", password);
  formData.append("profile_image", profile_image);

  // hit edit user backend route w/ form data
  const res = await fetch('/api/users/', {
    method: 'PUT',
    body: formData
  });

  // if successful
  if (res.ok) {
    // parse res to json
    const sessionUserInfo = await res.json();

    // dispatch setting session user
    dispatch(setUser(sessionUserInfo));

    // return session user info data
    return sessionUserInfo;
  }

  return res;
}

/* --------- SELECTOR FUNCTIONS -------- */
export const getCurrentUserInfo = state => state.session.user;
export const getUserEmail = state => state.session.user ? state.session.user.email : state.session.user;
export const getCurrentUserId = state => state.session.user ? state.session.user.id : state.session.user;
export const getUserProfilePicture = state => state.session.user ? state.session.user.profile_image : state.session.user;
export const getUserFirstName = state => state.session.user ? state.session.user.first_name : state.session.user;
export const getUserLastName = state => state.session.user ? state.session.user.last_name : state.session.user;
export const getUserDisplayName = state => state.session.user ? state.session.user.display_name : state.session.user;

/* --------- REDUCERS -------- */
const initialState = { user: null };

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }
    default:
      return state;
  }
}
