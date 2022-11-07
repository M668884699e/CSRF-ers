/* --------- ACTIONS -------- */
//? Action: set channel
const GET_CHANNEL_MESSAGES = 'messages/GET_CHANNEL_MESSAGES';
const CREATE_MESSAGE = 'messages/CREATE_MESSAGE';
const DELETE_MESSAGE = 'messages/DELETE_MESSAGE';

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
		message,
	};
};

// action creator: delete message
export const deleteMessage = (messageId) => {
	return {
		type: DELETE_MESSAGE,
		messageId,
	};
};

/* --------- THUNKS -------- */

// thunk get messages in channel
export const thunkGetChannelMessages =
	(channelId, type = 'channels') =>
	async (dispatch) => {
		// fetch messages in channel
		const res = await fetch(`/api/${type}/${channelId}/messages`);
		if (res.ok) {
			const channelMessages = await res.json();

			// dispatch user data to state
			dispatch(
				getChannelMessages(
					type === 'channels'
						? channelMessages.channel_messages
						: channelMessages.dmr_messages
				)
			);

			return channelMessages;
		}

		return null;
	};

export const thunkCreateMessage = (message) => async (dispatch) => {
	// fetch create message
	const res = await fetch('/api/messages/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(message),
	});

	if (res.ok) {
		const data = await res.json();
		dispatch(createMessage(message));

		return data;
	}

	return null;
};

export const thunkPutMessage = (message) => async (dispatch) => {
	// fetch backend to edit message
	const res = await fetch(`/api/messages/${message.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(message),
	});

	// if successful, proceed to sending new edited message to redux
	if (res.ok) {
		const editedMessage = await res.json();
		dispatch(createMessage(editedMessage));

		return editedMessage;
	}

	return null;
};

export const thunkDeleteMessage = (message) => async (dispatch) => {
	// fetch route to delete message

	const res = await fetch(`/api/messages/${message.id}`, {
		method: 'DELETE',
	});

	// if res is successfull, proceed to dispatch delete action
	if (res.ok) {
		dispatch(deleteMessage(message.id));
	}

	return null;
};

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
		// case to remove message
		case DELETE_MESSAGE:
			delete newMessages[action.messageId];

			return newMessages;
		default:
			return Object.assign({}, newMessages, action.messages);
	}
}
