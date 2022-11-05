// // SAVE FOR CHAWIN
// // src/components/MessagePage/LeftBar/AddPeopleModal/AddPeopleModal.js

// // import css
// import './AddPeopleModal.css';

// // import context
// import { useMessage } from '../../../../context/MessageContext';
// import { useUsers } from '../../../../context/UserContext';
// import { useStarter } from '../../../../context/StarterContext';
// import { useChannel } from '../../../../context/ChannelContext';
// import { useDMR } from '../../../../context/DMRContext';

// // import react
// import { useEffect, useState } from 'react';

// // import react-redux
// import { useDispatch, useSelector } from 'react-redux';

// // import react-router-dom
// import { useHistory } from 'react-router-dom';

// // import store
// import * as userActions from '../../../../store/users';
// import * as sessionActions from '../../../../store/session';
// import * as channelActions from '../../../../store/channel';
// import * as usersChannelsActions from '../../../../store/channels-users';
// import * as dmrActions from '../../../../store/dmr-users';
// import * as usersDMRsActions from '../../../../store/dmr-users';

// //? AddPeopleModal component
// const AddPeopleModal = ({ setAddPeopleModal }) => {
// 	/**
// 	 * Controlled inputs
// 	 */
// 	//? channel inputs
// 	const { createdChannelId, setCreatedChannelId } = useChannel();
// 	const { inputLength, setInputLength } = useChannel();
// 	const { editChannel, setEditChannel } = useChannel();
// 	const { currentChannelId, setCurrentChannelId } = useChannel();
// 	const [usersChannels, setUsersChannels] = useState([]);

// 	//? dmr inputs
// 	const { dmrs, setDMRs } = useDMR();
// 	const { createdDMRId, setCreatedDMRId } = useDMR();
// 	const { currentDMRId, setCurrentDMRId } = useDMR();
// 	const [usersDMRs, setUsersDMRs] = useState([]);

// 	//? message inputs
// 	const { dmrName, setDmrName } = useMessage();
// 	const { channelName, setChannelName } = useMessage();
// 	const { routeType, setRouteType } = useMessage();

// 	//? user inputs
// 	const { users, setUsers } = useUsers();
// 	const { usersBoolean, setUsersBoolean } = useUsers();
// 	const { loadedSelectUser, setLoadedSelectUser } = useUsers();
// 	const [load, setLoad] = useState(0);

// 	let usersIndexes = [];

// 	// selector functions
// 	const userState = useSelector(userActions.getAllUsers);
// 	const usersChannelsState = useSelector(
// 		usersChannelsActions.getAllUsersChannels
// 	);
// 	const usersDMRState = useSelector(dmrActions.getAllUserDMRs);

// 	// invoke dispatch
// 	const dispatch = useDispatch();

// 	// get current user id
// 	const getCurrentUserId = useSelector(sessionActions.getCurrentUserId);

// 	const history = useHistory();

// 	// on load
// 	useEffect(() => {
// 		// get users
// 		dispatch(userActions.thunkGetAllUsers());

// 		console.log('routeType', routeType);
// 	}, [dispatch, routeType]);

// 	// per userState
// 	useEffect(() => {
// 		// filter for noncurrent users only
// 		if (userState) {
// 			// const filteredUsers = Object.values(userState).filter(
// 			// 	(user) => user.id !== getCurrentUserId
// 			// );
// 			setUsers(
// 				Object.values(userState).filter((user) => user.id !== getCurrentUserId)
// 			);
// 		}
// 	}, [userState, usersDMRState]);

// 	// per users
// 	useEffect(() => {
// 		if (load < 50) {
// 			setLoad(load + 1);
// 		}

// 		if (users && load < 50 && load > 0) {
// 			const newUserBooleans = [];
// 			users.map((_) => newUserBooleans.push(false));
// 			setUsersBoolean(newUserBooleans);

// 			// if end-user is to edit the channel...
// 			if (editChannel) {
// 				const userIds = Object.values(userState).map((user) => user.id);
// 				usersChannels.forEach((uc, index) => {
// 					if (userIds.includes(uc.user_id) && uc.user_id !== 1) {
// 						newUserBooleans[uc.user_id - 2] = !newUserBooleans[uc.user_id - 2];
// 					}
// 				});

// 				setUsersBoolean(newUserBooleans);
// 			}
// 		}
// 	}, [users, load, usersBoolean, usersChannels, usersChannelsState]);

// 	// per usersBoolean
// 	useEffect(() => {
// 		// nothing for now
// 	}, [usersBoolean]);

// 	// useEffect per usersChannelsState
// 	useEffect(() => {
// 		setUsersChannels(
// 			usersChannelsState.filter((uc) => uc.channel_id === currentChannelId)
// 		);
// 		if (usersDMRState.length > 0) {
// 			setUsersDMRs(usersDMRState.filter((ud) => ud.dmr_id === currentDMRId));
// 		}
// 	}, [usersChannelsState]);

// 	// function to handle add members
// 	const addMembers = (e) => {
// 		// prevent page from refreshing
// 		e.preventDefault();

// 		// reset input length
// 		setInputLength(0);

// 		// if input length is greater than 0, proceed to posting new channel
// 		// get all users who is in current channels
// 		// reset userToAdd
// 		usersIndexes = [];

// 		// select all list that are selected
// 		const allTrue = document.querySelectorAll(
// 			"li[class*='apm-members-li-'][class$='-true']"
// 		);

// 		// push all selected list to usersIndexes
// 		Object.values(allTrue).map((currMember) =>
// 			usersIndexes.push(Number(currMember.className.split('-')[3]))
// 		);

// 		submitMembers();
// 	};

// 	// function to submit channel to add
// 	const submitMembers = () => {
// 		// get all user ids from users index
// 		const usersToAdd = usersIndexes.map((userIndex) => users[userIndex].id);

// 		// reset load
// 		// setLoad(0);

// 		// //? call on thunk to edit current channel and add people

// 		if (inputLength > 0) {
// 			if (routeType === 'channels') {
// 				return dispatch(
// 					usersChannelsActions.thunkDeleteChannelUsers(currentChannelId)
// 				)
// 					.then(() => dispatch(usersChannelsActions.thunkGetAllChannelsUsers()))
// 					.then(() => {
// 						return usersToAdd.map((user) => {
// 							dispatch(
// 								usersChannelsActions.thunkPutAddUserToChannel(
// 									createdChannelId,
// 									user
// 								)
// 							).then(() =>
// 								dispatch(usersChannelsActions.thunkGetAllChannelsUsers())
// 							);
// 						});
// 					})
// 					.then(() => {
// 						setLoad(0);
// 						setAddPeopleModal(false);
// 						window.location.reload(); // This is to reload the page due to the channelusers state not properly fetching from back end
// 					});
// 			} else {
// 				usersToAdd.unshift(getCurrentUserId);
// 				const userIds = usersToAdd.toString();
// 				console.log('userIds', userIds);
// 				return dispatch(usersDMRsActions.thunkPutAddUserToDMR(userIds)).then(
// 					() => {
// 						return dispatch(usersDMRsActions.thunkGetAllDMRUsers()).then(() => {
// 							setLoad(0);
// 							// return setAddPeopleModal(false);
// 							window.location.reload(); // This is to reload the page due to the channelusers state not properly fetching from back end
// 						});
// 					}
// 				);
// 			}
// 		} else {
// 			// if no input length, we remove all existing users except for owner
// 			// as no one is currently in channel
// 			if (routeType === 'channels') {
// 				dispatch(
// 					usersChannelsActions.thunkDeleteChannelUsers(currentChannelId)
// 				).then(() => dispatch(usersChannelsActions.thunkGetAllChannelsUsers()));
// 			} else {
// 				dispatch(usersDMRsActions.thunkGetAllDMRUsers());
// 			}
// 			setLoad(0);
// 			setAddPeopleModal(false);
// 		}

// 		//? After getting channel page in chat page, navigate to specific channel
// 		// navigate to channel page
// 		if (routeType === 'channels') {
// 			return history.push(`/chat/channels/${createdChannelId}`);
// 		} else {
// 			return history.push(`/chat/dmrs/${createdDMRId}`);
// 		}
// 	};

// 	return (
// 		<section id='apm-container'>
// 			<form id='apm-form' onSubmit={addMembers}>
// 				{routeType === 'dmrs' ? (
// 					<>
// 						<h1>Start a conversation with:</h1>
// 						<p>
// 							Conversations are direct messages with other Slack users. These
// 							messages cannot be seen by people outside of the conversation. If
// 							you would like to add a new person to an existing conversation, a
// 							new conversation must be created.
// 						</p>
// 					</>
// 				) : (
// 					<></>
// 				)}
// 				<h2>Add people</h2>
// 				<p>
// 					{routeType === 'channels' ? <># {channelName}</> : <># {dmrName}</>}
// 				</p>
// 				{/* container for choosing user */}
// 				<section id='apm-members-section'>
// 					{/* get list of all available users */}
// 					<ul id='apm-members-ul'>
// 						{users.map((user, index) => {
// 							return (
// 								<li
// 									key={user.id}
// 									value={user.id}
// 									id={`apm-members-li-${index}`}
// 									className={`apm-members-li-${index}-${usersBoolean[index]}`}
// 									onClick={(_) => {
// 										// set user boolean on click
// 										const newUserBooleans = usersBoolean;
// 										newUserBooleans[index] = !newUserBooleans[index];
// 										setUsersBoolean(newUserBooleans);

// 										// find a way to get previous usersboolean

// 										// could load up all the old users boolean and update it

// 										// update class name
// 										document.querySelector(
// 											`#apm-members-li-${index}`
// 										).className = `apm-members-li-${index}-${usersBoolean[index]}`;

// 										// select all list that are selected
// 										const allTrue = document.querySelectorAll(
// 											"li[class*='apm-members-li-'][class$='-true']"
// 										);

// 										setInputLength(allTrue.length);
// 										setLoadedSelectUser(loadedSelectUser + 1);
// 									}}
// 								>
// 									<figure className='apm-members-img-container'>
// 										<img
// 											className='apm-members-img'
// 											src={user.profile_image}
// 											alt={user.display_name}
// 										/>
// 									</figure>
// 									<span className='apm-members-dn'>{user.display_name}</span>
// 									<span className='apm-members-user-status'>
// 										<i className='fa-regular fa-circle fa-xs'></i>
// 									</span>
// 									<span className='apm-members-fn'>{user.first_name}</span>
// 									<span className='apm-members-ln'>{user.last_name}</span>
// 									<span className='apm-members-email'>{user.email}</span>
// 								</li>
// 							);
// 						})}
// 					</ul>
// 				</section>

// 				{/* on click of button, finish adding channel */}
// 				<figure id='ccm-button-container'>
// 					{
// 						<button
// 							id='ccmf-submit-button'
// 							type='submit'
// 							className={`ccmf-submit-button-true`}
// 						>
// 							{editChannel ? <>Edit</> : <>Add</>}
// 						</button>
// 					}
// 				</figure>
// 			</form>
// 		</section>
// 	);
// };

// // export component
// export default AddPeopleModal;

// ____________________________________________________________________________________________________________________________________________

// src/components/MessagePage/LeftBar/AddPeopleModal/AddPeopleModal.js

// import css
import './AddPeopleModal.css';

// import context
import { useMessage } from '../../../../context/MessageContext';
import { useUsers } from '../../../../context/UserContext';
import { useStarter } from '../../../../context/StarterContext';
import { useChannel } from '../../../../context/ChannelContext';
import { useDMR } from '../../../../context/DMRContext';

// import react
import { useEffect, useState } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import react-router-dom
import { useHistory } from 'react-router-dom';

// import store
import * as userActions from '../../../../store/users';
import * as sessionActions from '../../../../store/session';
import * as channelActions from '../../../../store/channel';
import * as usersChannelsActions from '../../../../store/channels-users';
import * as dmrActions from '../../../../store/dmr';
import * as usersDMRsActions from '../../../../store/dmr-users';

//? AddPeopleModal component
const AddPeopleModal = ({ setAddPeopleModal }) => {
	/**
	 * Controlled inputs
	 **/
	//? channel inputs
	const { channels, setChannels } = useChannel();
	const { createdChannelId, setCreatedChannelId } = useChannel();
	const { inputLength, setInputLength } = useChannel();
	const { editChannel, setEditChannel } = useChannel();
	const { currentChannelId, setCurrentChannelId } = useChannel();
	const [usersChannels, setUsersChannels] = useState([]);
	const [newDMRId, setNewDMRID] = useState();

	// DMR inputs
	// const { dmrs, setDMRs } = useDMR();
	const { createdDMRId, setCreatedDMRId } = useDMR();
	// const { currentDMRId, setCurrentDMRId } = useDMR();
	// const [usersDMRs, setUsersDMRs] = useState([]);

	// message inputs
	// const { dmrName, setDMRName } = useMessage();
	const { channelName, setChannelName } = useMessage();
	const { routeType, setRouteType } = useMessage();

	//? user inputs
	const { users, setUsers } = useUsers();
	const { usersBoolean, setUsersBoolean } = useUsers();
	const { loadedSelectUser, setLoadedSelectUser } = useUsers();
	const [load, setLoad] = useState(0);
	const [validationErrors, setValidationErrors] = useState([]);

	let usersIndexes = [];

	// selector functions
	const userState = useSelector(userActions.getAllUsers);
	const usersChannelsState = useSelector(
		usersChannelsActions.getAllUsersChannels
	);
	const usersDMRsState = useSelector(usersDMRsActions.getAllUserDMRs);
	const dmrState = useSelector(dmrActions.getAllDMRs);

	// invoke dispatch
	const dispatch = useDispatch();

	// get current user id
	const getCurrentUserId = useSelector(sessionActions.getCurrentUserId);

	const history = useHistory();

	// on load
	useEffect(() => {
		// get users
		dispatch(userActions.thunkGetAllUsers());
	}, [dispatch]);

	// per userState
	useEffect(() => {
		// filter for noncurrent users only
		if (userState) {
			// const filteredUsers = Object.values(userState).filter(
			// 	(user) => user.id !== getCurrentUserId
			// );
			setUsers(
				Object.values(userState).filter((user) => user.id !== getCurrentUserId)
			);
		}
	}, [userState, validationErrors, routeType]);

	// per users
	useEffect(() => {
		if (load < 15) {
			setLoad(load + 1);
		}

		if (users && load < 15 && load > 0) {
			const newUserBooleans = [];
			users.map((_) => newUserBooleans.push(false));
			setUsersBoolean(newUserBooleans);
			if (editChannel) {
				const userIds = Object.values(userState).map((user) => user.id);
				usersChannels.forEach((uc, index) => {
					if (userIds.includes(uc.user_id) && uc.user_id !== 1) {
						newUserBooleans[uc.user_id - 2] = !newUserBooleans[uc.user_id - 2];
					}
				});

				setUsersBoolean(newUserBooleans);
			}
		}
	}, [users, load, usersBoolean, usersChannels, usersChannelsState]);

	// per dmrState
	useEffect(() => {
		dispatch(dmrActions.thunkGetAllDmrs());
	}, [dispatch]);

	// per usersBoolean
	useEffect(() => {
		// nothing for now
		setNewDMRID(dmrState);
	}, [usersBoolean, dmrState]);

	// useEffect per usersChannelsState
	useEffect(() => {
		setUsersChannels(
			usersChannelsState.filter((uc) => uc.channel_id === currentChannelId)
		);
	}, [usersChannelsState]);

	// added this in -sam, this is pointless? - sam
	// ---------------------------------------------
	// useEffect per usersDMRsState
	// useEffect(() => {
	// 	setUsersDMRs(usersDMRsState.filter((ud) => ud.dmr_id === currentDMRId));
	// }, [usersDMRsState])
	// ---------------------------------------------

	// function to handle add members
	const addMembers = (e) => {
		// prevent page from refreshing
		e.preventDefault();

		// reset input length
		setInputLength(0);

		// if input length is greater than 0, proceed to posting new channel
		usersIndexes = [];

		// select all list that are selected
		const allTrue = document.querySelectorAll(
			"li[class*='apm-members-li-'][class$='-true']"
		);

		// push all selected list to usersIndexes
		Object.values(allTrue).map((currMember) =>
			usersIndexes.push(Number(currMember.className.split('-')[3]))
		);

		submitMembers();
	};

	// function to submit channel to add
	const submitMembers = () => {
		// get all user ids from users index
		const usersToAdd = usersIndexes.map((userIndex) => users[userIndex].id);

		// reset load
		// setLoad(0);

		// //? call on thunk to edit current channel and add people

		if (usersToAdd.length > 0) {
			console.log(routeType, "routeType")
			if (routeType === 'channels') {
				return dispatch(
					usersChannelsActions.thunkDeleteChannelUsers(currentChannelId)
				)
					.then(() => dispatch(usersChannelsActions.thunkGetAllChannelsUsers()))
					.then(() => {
						return usersToAdd.map((user) => {
							dispatch(
								usersChannelsActions.thunkPutAddUserToChannel(
									createdChannelId,
									user
								)
							).then(() => {
								dispatch(channelActions.thunkGetUserChannels());
								dispatch(usersChannelsActions.thunkGetAllChannelsUsers());
							});
						});
					})
					.then(() => {
						setLoad(0);
						setAddPeopleModal(false);
					});
			} else {
				// // if no input length, we remove all existing users except for owner
				// // as no one is currently in channel
				// dispatch(
				// 	usersChannelsActions.thunkDeleteChannelUsers(currentChannelId)
				// ).then(() => dispatch(usersChannelsActions.thunkGetAllChannelsUsers()));
				// setLoad(0);
				// setAddPeopleModal(false);
				usersToAdd.unshift(getCurrentUserId);
				// const newDMRName = usersToAdd
				const userIds = usersToAdd.toString();
				return dispatch(usersDMRsActions.thunkGetAllDMRUsers())
					.then(() => dispatch(usersDMRsActions.thunkPutAddUserToDMR(userIds)))
					.then((res) => {
						if (res.errors) {
							// reset errors
							setValidationErrors([]);

							// show errors
							setValidationErrors([res.errors]);
						} else {
							return dispatch(dmrActions.thunkGetAllDmrs()).then(() => {
								dispatch(usersDMRsActions.thunkGetAllDMRUsers());
								setLoad(0);
								setAddPeopleModal(false);
								return history.push(`/chat/dmr/${newDMRId.length + 1}`);
							});
						}
					});
			}
		} else {
			// if no input length, we remove all existing users except for owner
			// as no one is currently in channel
			if (routeType === 'channels') {
				dispatch(
					usersChannelsActions.thunkDeleteChannelUsers(currentChannelId)
				).then(() => dispatch(usersChannelsActions.thunkGetAllChannelsUsers()));
			} else {
				dispatch(usersDMRsActions.thunkGetAllDMRUsers());
			}
			setLoad(0);
			setAddPeopleModal(false);
		}

		//? After getting channel page in chat page, navigate to specific channel
		// navigate to channel page
		if (routeType === 'channels') {
			return history.push(`/chat/channels/${createdChannelId}`);
		} else {
			return history.push(`/chat/dmrs/${createdDMRId}`);
		}
	};

	return (
		<section id='apm-container'>
			<form id='apm-form' onSubmit={addMembers}>
				{routeType === 'dmrs' ? (
					<>
						<h1>Start a conversation with:</h1>
						{/* validation errors: catch channel creating errors */}
						<div className='epm-error-container'>
							{validationErrors &&
								validationErrors.map((error, ind) => (
									<div key={ind}>{error}</div>
								))}
						</div>
						<p id='apm-form-dmr'>
							Conversations are direct messages with other Slack users. These
							messages cannot be seen by people outside of the conversation. If
							you would like to add a new person to an existing conversation, a
							new conversation must be created.
						</p>
					</>
				) : (
					<></>
				)}
				<h2>Add people</h2>
				<p>{routeType === 'channels' ? <># {channelName}</> : <></>}</p>
				{/* container for choosing user */}
				<section id='apm-members-section'>
					{/* get list of all available users */}
					<ul id='apm-members-ul'>
						{users.map((user, index) => {
							return (
								<li
									key={user.id}
									value={user.id}
									id={`apm-members-li-${index}`}
									className={`apm-members-li-${index}-${usersBoolean[index]}`}
									onClick={(_) => {
										// set user boolean on click
										const newUserBooleans = usersBoolean;
										newUserBooleans[index] = !newUserBooleans[index];
										setUsersBoolean(newUserBooleans);

										// find a way to get previous usersboolean

										// could load up all the old users boolean and update it

										// update class name
										document.querySelector(
											`#apm-members-li-${index}`
										).className = `apm-members-li-${index}-${usersBoolean[index]}`;

										// select all list that are selected
										const allTrue = document.querySelectorAll(
											"li[class*='apm-members-li-'][class$='-true']"
										);

										setInputLength(allTrue.length);
										setLoadedSelectUser(loadedSelectUser + 1);
									}}
								>
									<figure className='apm-members-img-container'>
										<img
											className='apm-members-img'
											src={user.profile_image}
											alt={user.display_name}
										/>
									</figure>
									<span className='apm-members-dn'>{user.display_name}</span>
									<span className='apm-members-user-status'>
										<i className='fa-regular fa-circle fa-xs'></i>
									</span>
									<span className='apm-members-fn'>{user.first_name}</span>
									<span className='apm-members-ln'>{user.last_name}</span>
									<span className='apm-members-email'>{user.email}</span>
								</li>
							);
						})}
					</ul>
				</section>

				{/* on click of button, finish adding channel */}
				<figure id='ccm-button-container'>
					{
						<button
							id='ccmf-submit-button'
							type='submit'
							className={`ccmf-submit-button-true`}
						>
							{editChannel ? <>Edit</> : <>Add</>}
						</button>
					}
				</figure>
			</form>
		</section>
	);
};

// export component
export default AddPeopleModal;
