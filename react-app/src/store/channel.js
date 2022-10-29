/* --------- ACTIONS -------- */
//? Action: set channel
// action
const GET_CHANNELS = 'channel/GET_CHANNELS';
const GET_CHANNEL = 'channel/GET_CHANNEL';
const GET_CHANNEL_USERS = 'channel/GET_CHANNEL_USERS';
const GET_CHANNEL_MESSAGES = 'channel/GET_CHANNEL_MESSAGES';
const SET_CHANNEL = 'channel/SET_CHANNEL';
const PUT_CHANNEL_USER = 'channel/SET_CHANNEL_USER';
const PUT_CHANNEL = 'channel/PUT_CHANNEL';
const DELETE_CHANNEL = 'channel/DELETE_CHANNEL';

// action creator: get channels
export const loadChannels = channels => {
  return {
    type: GET_CHANNELS,
    channels
  }
}

// action creator: get channel by id
export const loadChannel = id => {
  return {
    type: GET_CHANNEL,
    id
  }
}

// action creator: get channel users
export const getChannelUsers = channel => {
  return {
    type: GET_CHANNEL_USERS,
    channel
  }
}

// action creator: get channel messages
export const getChannelMessages = channel => {
  return {
    type: GET_CHANNEL_MESSAGES,
    channel
  }
}

// action creator: create new channel
export const createChannel = channel => {
  return {
    type: SET_CHANNEL,
    channel
  }
}

// action creator: add user to channel
export const addChannelUser = channel => {
  return {
    type: PUT_CHANNEL_USER,
    channel
  }
}

// action creator: put channel
export const putChannel = id => {
  return {
    type: PUT_CHANNEL,
    id
  }
}

// action creator: delete channel
export const deleteChannel = id => {
  return {
    type: DELETE_CHANNEL,
    id
  }
}

/* --------- THUNKS -------- */
//? Thunk action to get all channels
export const thunkGetChannels = () => async dispatch => {
  // fetch all channels
  const res = await fetch('/api/channels/');

  if (res.ok) {

    // parse res to channels data
    const channelData = await res.json();

    // dispatch load channel w/ loaded channels
    dispatch(loadChannels(channelData.channels));

    // return channels
    return channelData;
  }
}

//? Thunk action to get all current user channels
export const thunkGetUserChannels = () => async dispatch => {
  const res = await fetch("/api/users/channels")

  if (res.ok) {
    const userChannelData = await res.json();
    console.log(userChannelData, "userChannelData")

    dispatch(loadChannels(userChannelData.channels));
    return userChannelData;
  }
}

//? Thunk action to get channel by id
export const thunkGetChannelById = (id) => async(dispatch) => {
  const res = await fetch(`/api/channels/${id}`);

  if (res.ok) {
    // parse data
    const channel = res.json();

    // dispatch w/ channel data
    dispatch(loadChannel(channel.id))

    // return channel
    return channel;
  }
}

// thunk get users in channel
export const thunkGetChannelUsers = (channel) => async(dispatch) => {
  // deconstruct channel and grab id
  const { id } = channel;

  // fetch users in channel
  const res = await fetch(`/api/channels/${id}/users/`)

  // if response ok
  if(res.ok){
    const channelUsers = res.json();

    // dispatch user data to state
    dispatch(getChannelUsers(channel));

    return channelUsers;
  }
}

// thunk get messages in channel
export const thunkGetChannelMessages = (channel) => async(dispatch) => {
  // deconstruct channel and grab id
  const { id } = channel;

  // fetch messages in channel
  const res = await fetch(`/api/channels/${id}/messages/`)

  // if response ok
  if(res.ok){
    const channelMessages = res.json();

    // dispatch user data to state
    dispatch(getChannelMessages(channel));

    return channelMessages;
  }
}

export const thunkPostNewChannel = new_channel_info => async dispatch => {
  // fetch post new channel
  const res = await fetch(`/api/channels/`, {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(new_channel_info)
  });

  if(!res) return null;

  if(res.ok){
    const data = await res.json();
    dispatch(createChannel(data));

    return data;
  }
}

// thunk put user or users into channel
export const thunkPutUserChannel = (channel, userId) => async(dispatch) => {

  // fetch the put data
  const res = await fetch(`/api/channels/${channel}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify()
  });

  // iterate through users grab the id
  // create put for each one

  // dispatch for each id
}

// thunk put channel
// export const thunkPutChannel = id => async dispatch => {

//   // fetch the put data
//   const res = await fetch(`/api/channels/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type' : 'application/json'
//     },
//     // body: JSON.stringify(channel)
//   });

//   // if falsy return null
//   if(!res) return null;

//   // if response === 200
//   if(res.ok){
//     const data = res.json();
//     dispatch(putChannel(data));
//     return data;
//   }
// }

// thunk delete channel
export const thunkDeleteChannel = id => async dispatch => {

  // delete channel
  const res = await fetch(`/api/channels/${id}`, {
    method: 'DELETE'
  });

  // if no response return null
  if(!res) return null;

  // if res === 200 dispatch delete action
  if(res.ok){
    const data = res.json();
    dispatch(deleteChannel(id));
    return data;
  }
}

//
/* --------- SELECTOR FUNCTIONS -------- */
export const getAllChannels = state => Object.values(state.channels);

export const getChannelById = channelId => state => Object.values(state.channels).find(channel => channel.id === Number(channelId))
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
