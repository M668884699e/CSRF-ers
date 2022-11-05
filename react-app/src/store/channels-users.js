/* --------- ACTIONS -------- */
// action
const GET_ALL_CHANNELS_USERS = 'channelsUsers/GET_ALL_CHANNELS_USERS';

// action creator: get channel users
export const getAllChannelsUsers = (channelsUsers) => {
	return {
		type: GET_ALL_CHANNELS_USERS,
		channelsUsers,
	};
};

// action
const DELETE_ALL_CHANNEL_USERS_BY_ID =
	'channelsUsers/DELETE_ALL_CHANNEL_USERS_BY_ID';

// action creator: delete all channel users
export const deleteAllChannelsUsers = (channelId) => {
	return {
		type: DELETE_ALL_CHANNEL_USERS_BY_ID,
		channelId,
	};
};

// action
const PUT_CHANNEL_USER = 'channelsUsers/PUT_CHANNEL_USER';

// action creator: add user to channel
export const addChannelUser = (channelsUsers) => {
	return {
		type: PUT_CHANNEL_USER,
		channelsUsers,
	};
};

// action
const REMOVE_USER_FROM_CHANNEL = 'channelsUsers/REMOVE_USER_FROM_CHANNEL';

// action creator: remove given user from given channel
export const removeUserFromChannel = (channelId, userId) => {
	return {
		type: REMOVE_USER_FROM_CHANNEL,
		channelId,
		userId,
	};
};

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
			dispatch(addChannelUser(channelData));

			return channelData;
		} else {
			return null;
		}
	};

export const thunkDeleteChannelUsers = (channelId) => async (dispatch) => {
	console.log('channelId', channelId);

	// delete users from given channel's channel id
	const res = await fetch(`/api/channels/${channelId}/users`, {
		method: 'DELETE',
	});

	if (res.ok) {
		return dispatch(deleteAllChannelsUsers(channelId));
	}

	return res;
};

export const thunkRemoveUserFromChannel =
	(channelId, userId) => async (dispatch) => {
		// delete users from given channel's channel id
		const res = await fetch(`/api/channels/${channelId}/users/${userId}`, {
			method: 'DELETE',
		});

		if (res.ok) {
			return dispatch(removeUserFromChannel(channelId, userId));
		}

		return res;
	};

/* --------- SELECTOR FUNCTIONS -------- */
export const getAllUsersChannels = (state) =>
	state.channelsUsers.channels_users;

/* --------- REDUCERS -------- */
const initialState = {};

export default function channelsUsersReducer(state = initialState, action) {
	const newChannelsUsers = { ...state };

	switch (action.type) {
		// remove given user from given channel
		case REMOVE_USER_FROM_CHANNEL:
			const deleteUserFromChannel = { ...state };

			Object.values(deleteUserFromChannel).forEach((cu, index) => {
				if (cu.channel_id === action.channelId && cu.user_id === action.userId)
					delete deleteUserFromChannel[index];
			});

			return deleteUserFromChannel;
		// delete all channel users from given channel
		case DELETE_ALL_CHANNEL_USERS_BY_ID:
			const deleteUsersFromChannel = { ...state };

			Object.values(deleteUsersFromChannel).forEach((cu) => {
				if (cu.channel_id === action.channelId) delete cu.channel_id;
			});

			return deleteUsersFromChannel;
		// default case
		default:
			return Object.assign({}, newChannelsUsers, action.channelsUsers);
	}
}
