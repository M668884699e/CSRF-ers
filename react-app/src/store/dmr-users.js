/* --------- ACTIONS -------- */
// action
const GET_ALL_DMR_USERS = 'dmrUsers/GET_ALL_DMR_USERS';

// action creator: get channel users
export const getAllDMRUsers = (dmrUsers) => {
	return {
		type: GET_ALL_DMR_USERS,
		dmrUsers,
	};
};

// action
const ADD_DMR_USER = 'dmrsUsers/ADD_DMR_USER';

// action creator: add user to dmr
export const addDmrUser = (dmrsUsers) => {
	return {
		type: ADD_DMR_USER,
		dmrsUsers,
	};
};

// action
const REMOVE_DMR_FROM_CHANNEL = 'dmrsUsers/REMOVE_DMR_FROM_CHANNEL';

// action creator: remove given user from given dmr
export const removeUserFromDMR = (dmrId, userId) => {
	return {
		type: REMOVE_DMR_FROM_CHANNEL,
		dmrId,
		userId,
	};
};

/* --------- THUNKS -------- */
// thunk to get all dmr users
export const thunkGetAllDMRUsers = () => async (dispatch) => {
	const res = await fetch('/api/dmr/all/users');

	// if response is ok
	if (res.ok) {
		const allDMRUsers = await res.json();

		dispatch(getAllDMRUsers(allDMRUsers));

		return allDMRUsers;
	}

	return res;
};

// thunk put user or users into channel
export const thunkPutAddUserToDMR = (userIds) => async (dispatch) => {
	// 1,2,3
	// "user_ids":"1,2,3"
	const usersToAdd = { user_ids: userIds.toString() };
	// fetch the put data
	const res = await fetch(`/api/dmr/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(usersToAdd),
	});

	if (res.ok) {
		const dmrData = await res.json();
		dispatch(addDmrUser(dmrData));

		return dmrData;
	} else {
		return null;
	}
};

// thunk to remove user from dmr
export const thunkRemoveUserFromDMR = (dmrId, userId) => async (dispatch) => {
	// delete users from given dmr's dmr id
	const res = await fetch(`/api/dmr/${dmrId}/users/${userId}`, {
		method: 'DELETE',
	});

	if (res.ok) {
		return dispatch(removeUserFromDMR(dmrId, userId));
	}

	return res;
};

/* --------- SELECTOR FUNCTIONS -------- */
export const getAllUserDMRs = (state) => state.dmrUsers.dmr_users;

/* --------- REDUCERS -------- */
const initialState = {};

export default function dmrUsersReducer(state = initialState, action) {
	const newDMRUsers = { ...state };

	switch (action.type) {
		// get channel case
		case REMOVE_DMR_FROM_CHANNEL:
			Object.values(newDMRUsers).forEach((du, index) => {
				if (du.dmr_id === action.dmrId && du.user_id === action.userId)
					delete newDMRUsers[index];
			});

			return newDMRUsers;
		// default case
		default:
			return Object.assign({}, newDMRUsers, action.dmrUsers);
	}
}
