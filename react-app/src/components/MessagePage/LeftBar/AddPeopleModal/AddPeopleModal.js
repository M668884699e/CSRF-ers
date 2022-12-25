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
		dispatch(userActions.thunkGetAllUsers()).catch(() => { });
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
	}, [usersChannelsState, newDMRId]);

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
			if (routeType === 'channels') {
				return dispatch(
					usersChannelsActions.thunkDeleteChannelUsers(createdChannelId)
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
								dispatch(channelActions.thunkGetUserChannels()).catch(() => { });
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
							return dispatch(dmrActions.thunkGetAllDmrs()).then((res) => {
								dispatch(usersDMRsActions.thunkGetAllDMRUsers());
								setLoad(0);
								setAddPeopleModal(false);
								if (
									Object.values(res.dmrs) &&
									Object.values(res.dmrs).length + 1
								) {
									return history.push(
										`/chat/dmr/${Object.values(res.dmrs).length + 1}`
									);
								} else {
									return history.push(`/chat`);
								}
							});
						}
					});
			}
		} else {
			// if no input length, we remove all existing users except for owner
			// as no one is currently in channel
			if (routeType === 'channels') {
				dispatch(
					editChannel
						? usersChannelsActions.thunkDeleteChannelUsers(currentChannelId)
						: usersChannelsActions.thunkDeleteChannelUsers(createdChannelId)
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
				{routeType === 'dmr' ? (
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
						{
							users.length > 0 ?
								users.map((user, index) => {
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
								})
								:
								<li
									className="no-members"
								>
									No Members Available To Add
								</li>
						}
					</ul>
				</section>

				{/* on click of button, finish adding channel */}
				<figure id='ccm-button-container'>
					{/* if dmr and user to add length is 1 or less than 1, disable the button */}
					{usersBoolean.filter((ub) => ub).length === 0 &&
						routeType === 'dmr' ? (
						<button
							id='ccmf-submit-button'
							type='button'
							className={`ccmf-submit-button-false`}
						>
							{editChannel ? <>Edit</> : <>Add</>}
						</button>
					) : (
						// otherwise enable button
						<button
							id='ccmf-submit-button'
							type='submit'
							className={`ccmf-submit-button-true`}
						>
							{editChannel ? <>Edit</> : <>Add</>}
						</button>
					)}
				</figure>
			</form>
		</section>
	);
};

// export component
export default AddPeopleModal;
