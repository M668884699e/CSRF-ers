/* --------- ACTIONS -------- */
// action
const GET_ALL_DMR_USERS = 'dmrUsers/GET_ALL_DMR_USERS';

// action creator: get channel users
export const getAllDMRUsers = dmrUsers => {
  return {
    type: GET_ALL_DMR_USERS,
    dmrUsers
  }
}

/* --------- THUNKS -------- */
// thunk to get all channels users
export const thunkGetAllDMRUsers = () => async (dispatch) => {
  const res = await fetch('/api/dmr/all/users');

  // if response is ok
  if (res.ok) {
    const allDMRUsers = await res.json();

    dispatch(getAllDMRUsers(allDMRUsers));

    return allDMRUsers;
  }

  return res;
}

/* --------- SELECTOR FUNCTIONS -------- */
export const getAllUserDMRs = (state) => state.dmrUsers.dmr_users;


/* --------- REDUCERS -------- */
const initialState = {};

export default function dmrUsersReducer(state = initialState, action) {
  const newDMRUsers = { ...state };

  switch (action.type) {
    // get channel case

    // default case
    default:
      return Object.assign({}, newDMRUsers, action.dmrUsers);
  }
}
