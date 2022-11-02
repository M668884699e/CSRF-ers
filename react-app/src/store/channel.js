/* --------- ACTIONS -------- */
//? Action: set channel
// action
const GET_CHANNELS = 'channels/GET_CHANNELS';
const GET_CHANNEL = 'channels/GET_CHANNEL';
const GET_CHANNEL_USERS = 'channels/GET_CHANNEL_USERS';

const SET_CHANNEL = 'channels/SET_CHANNEL';
const PUT_CHANNEL_USER = 'channels/SET_CHANNEL_USER';
const PUT_CHANNEL = 'channels/PUT_CHANNEL';
const DELETE_CHANNEL = 'channels/DELETE_CHANNEL';

// action creator: get channels
export const loadChannels = (channels) => {
	return {
		type: GET_CHANNELS,
		channels,
	};
};

// action creator: get channel by id
export const loadChannel = (id) => {
	return {
		type: GET_CHANNEL,
		id,
	};
};

// action creator: get channel users
export const getChannelUsers = (channel) => {
	return {
		type: GET_CHANNEL_USERS,
		channel,
	};
};

// action creator: create new channel
export const createChannel = (channel) => {
	return {
		type: SET_CHANNEL,
		channel,
	};
};

// action creator: add user to channel
export const addChannelUser = (channel) => {
	return {
		type: PUT_CHANNEL_USER,
		channel,
	};
};

// action creator: put channel
export const putChannel = (id) => {
	return {
		type: PUT_CHANNEL,
		id,
	};
};

// action creator: delete channel
export const deleteChannel = (id) => {
	return {
		type: DELETE_CHANNEL,
		id,
	};
};

/* --------- THUNKS -------- */
//? Thunk action to get all channels
export const thunkGetChannels = () => async (dispatch) => {
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
};

//? Thunk action to get all current user channels
export const thunkGetUserChannels = () => async (dispatch) => {
	const res = await fetch('/api/users/channels');

	if (res.ok) {
		const userChannelData = await res.json();

		dispatch(loadChannels(userChannelData.channels));
		return userChannelData;
	}
};

//? Thunk action to get channel by id
export const thunkGetChannelById = (id) => async (dispatch) => {
	const res = await fetch(`/api/channels/${id}`);

	if (res.ok) {
		// parse data
		const channel = res.json();

		// dispatch w/ channel data
		dispatch(loadChannel(channel.id));

		// return channel
		return channel;
	}
};

// thunk get users in channel
export const thunkGetChannelUsers = (channel) => async (dispatch) => {
	// deconstruct channel and grab id
	const { id } = channel;

	// fetch users in channel
	const res = await fetch(`/api/channels/${id}/users/`);

	// if response ok
	if (res.ok) {
		const channelUsers = res.json();

		// dispatch user data to state
		dispatch(getChannelUsers(channel));

		return channelUsers;
	}
};

export const thunkPostNewChannel = (new_channel_info) => async (dispatch) => {
	// fetch post new channel
	const res = await fetch(`/api/channels/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(new_channel_info),
	});

	if (res.ok) {
		const data = await res.json();
		dispatch(createChannel(data));

		return data;
	}

	return null;
};

// thunk put user or users into channel
export const thunkPutAddUserToChannel =
	(channelId, userId) => async (dispatch) => {
		// fetch the put data
		const res = await fetch(`/api/channels/${channelId}/users/${userId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (res.ok) {
			const channelData = await res.json();
			dispatch(createChannel(channelData));

			return channelData;
		} else {
			return null;
		}
		// iterate through users grab the id
		// create put for each one

		// dispatch for each id
	};

// thunk put channel
export const thunkPutChannel = (channelInfo, channelId) => async (dispatch) => {
	// fetch the put data
	const res = await fetch(`/api/channels/${channelId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(channelInfo),
	});

	if (res.ok) {
		const data = await res.json();
		dispatch(createChannel(data));

		return data;
	}

	return null;
};

// thunk delete channel
export const thunkDeleteChannel = (id) => async (dispatch) => {
	// delete channel
	const res = await fetch(`/api/channels/${id}`, {
		method: 'DELETE',
	});

	// if res === 200 dispatch delete action
	if (res.ok) {
		dispatch(deleteChannel(id));
		return null;
	}
};

//
/* --------- SELECTOR FUNCTIONS -------- */
export const getAllChannels = (state) => Object.values(state.channels);

export const getChatById =
	(chatId, type = 'channel') =>
		(state) =>
			type === 'channel'
				? Object.values(state.channels).find(
					(channel) => channel.id === Number(chatId)
				)
				: Object.values(state.dmrs).find((dmr) => dmr.id === Number(chatId));
/* --------- REDUCERS -------- */

const initialState = {};

export default function channelReducer(state = initialState, action) {
	const newChannels = { ...state };

	switch (action.type) {
		// case: remove channel
		case DELETE_CHANNEL:
			const deleteChannels = { ...state };

			delete deleteChannels[action.id]


			// Object.keys(deleteChannels).forEach(key => {
			// 	if(deleteChannels[key][id] === action.id) delete deleteChannels[key]
			// });

			// console.log('deleteChannels (before)', deleteChannels);
			// console.log('newChannels', newChannels);

			// Object.values(deleteChannels).forEach((channel, index) => {
			// 	console.log('channel.id', channel.id, '|| type of', typeof channel.id);
			// 	console.log('action.id', action.id, '|| type of', typeof action.id);
			// 	if (channel.id === action.id) delete deleteChannels[index];
			// });

			// console.log('deleteChannels (after)', deleteChannels);

			// delete Object.values(newChannels).find((channel) => {
			// 	console.log('channel.id', channel.id, '|| type of', typeof channel.id);
			// 	console.log('action.id', action.id, '|| type of', typeof action.id);
			// 	return channel.id === action.id;
			// });

			// console.log({...state}, "test 1")

			return deleteChannels;
		// default case
		default:
			return Object.assign({}, newChannels, action.channels);
	}
}
