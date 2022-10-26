

/* --------- ACTIONS -------- */
//? Action: set channel
// action
const GET_CHANNEL = 'channel/GET_CHANNEL';

// action creator: get channel
export const loadChannels = channels => {
  return {
    type: GET_CHANNEL,
    channels
  }
} 

/* --------- THUNKS -------- */
//? Thunk action to get all channels
export const thunkGetChannels = () => async dispatch => {
  // fetch all channels
  const res = await fetch('/api/channels');

  if (res.ok) {
    
    // parse res to channels data
    const channelData = await res.json();

    // dispatch load channel w/ loaded channels
    dispatch(loadChannels(channelData.channels));

    // return channels
    return channelData;
  }
}

/* --------- SELECTOR FUNCTIONS -------- */
export const getAllChannels = state => Object.values(state.channels);

/* --------- REDUCERS -------- */

const initialState = {};

export default function channelReducer(state = initialState, action) {
  const newChannels = { ...state };

  switch (action.type) {
    // get channel case
    
    // default case
    default:
      return Object.assign({}, newChannels, action.channels);
  }
}
