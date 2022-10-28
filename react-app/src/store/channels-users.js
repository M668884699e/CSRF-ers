/* --------- ACTIONS -------- */
// action
const GET_ALL_CHANNELS_USERS = 'channelsUsers/GET_ALL_CHANNELS_USERS';

// action creator: get channel users
export const getAllChannelsUsers = channelsUsers => {
  return {
    type: GET_ALL_CHANNELS_USERS,
    channelsUsers
  }
}

/* --------- THUNKS -------- */
// thunk to get all channels users
export const thunkGetAllChannelsUsers = () => async (dispatch) => {
  const res = await fetch('/api/channels/all/users');

  // if response is ok
  if (res.ok) {
    const allChannelsUsers = await res.json();

    dispatch(getAllChannelsUsers(allChannelsUsers));

    return allChannelsUsers;
  }

  return res;
}

/* --------- SELECTOR FUNCTIONS -------- */
export const getAllUsersChannels = state => state.channelsUsers.channels_users;

/* --------- REDUCERS -------- */
const initialState = {};

export default function channelsUsersReducer(state = initialState, action) {
  const newChannelsUsers = { ...state };

  switch (action.type) {
    // get channel case
    
    // default case
    default:
      return Object.assign({}, newChannelsUsers, action.channelsUsers);
  }
}
