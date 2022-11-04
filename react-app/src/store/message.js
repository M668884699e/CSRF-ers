/* --------- ACTIONS -------- */
//? Action: set channel
const GET_CHANNEL_MESSAGES = 'messages/GET_CHANNEL_MESSAGES';
const CREATE_MESSAGE = 'messages/CREATE_MESSAGE';

// action creator: get channel messages
export const getChannelMessages = (messages) => {
	return {
		type: GET_CHANNEL_MESSAGES,
		messages,
	};
};

// action creator: create new message
export const createMessage = (message) => {
	return {
		type: CREATE_MESSAGE,
		message
	}
}
/* --------- THUNKS -------- */

// thunk get messages in channel
export const thunkGetChannelMessages =
	(channelId, type = 'channels') =>
	async (dispatch) => {
		// fetch messages in channel
		const res = await fetch(`/api/${type}/${channelId}/messages`);
		if (res.ok) {
			const channelMessages = await res.json();
			// console.log(channelMessages);

			// dispatch user data to state
			dispatch(getChannelMessages(type === 'channels'? channelMessages.channel_messages: channelMessages.dmr_messages));

				return channelMessages;
		}
	};

export const thunkCreateMessage = message => async dispatch => {
	// fetch create message
	const res = await fetch('/api/messages/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(message)
	});

	if(res.ok){
		const data = await res.json();
		dispatch(createMessage(message));

		return data;
	}

	return null;
}

/* --------- SELECTOR FUNCTIONS -------- */
export const getAllMessages = (state) =>
	state.messages.message
		? Object.values(state.messages.message)
		: state.messages;

/* --------- REDUCERS -------- */
const initialState = {};

export default function messageReducer(state = initialState, action) {
	const newMessages = { ...state };

	switch (action.type) {
		default:
			return Object.assign({}, newMessages, action.messages);
	}
}
