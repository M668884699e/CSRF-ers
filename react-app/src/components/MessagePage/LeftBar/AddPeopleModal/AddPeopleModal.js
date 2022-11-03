// src/components/MessagePage/LeftBar/AddPeopleModal/AddPeopleModal.js

// import css
import './AddPeopleModal.css';

// import context
import { useMessage } from '../../../../context/MessageContext';
import { useUsers } from '../../../../context/UserContext';
import { useStarter } from '../../../../context/StarterContext';
import { useChannel } from '../../../../context/ChannelContext';

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

//? AddPeopleModal component
const AddPeopleModal = ({ setAddPeopleModal }) => {
	/**
	 * Controlled inputs
	 */
	const { channelName, setChannelName } = useMessage();
	const { users, setUsers } = useUsers();
	const { inputLength, setInputLength } = useChannel();
	const { usersBoolean, setUsersBoolean } = useUsers();
	const { loadedSelectUser, setLoadedSelectUser } = useUsers();
	const { createdChannelId, setCreatedChannelId } = useChannel();
	const [usersChannels, setUsersChannels] = useState([]);
	const { currentChannelId, setCurrentChannelId } = useChannel();
	const { editChannel, setEditChannel } = useChannel();
	const [load, setLoad] = useState(0);

	let usersIndexes = [];

	// selector functions
	const userState = useSelector(userActions.getAllUsers);
	const usersChannelsState = useSelector(
		usersChannelsActions.getAllUsersChannels
	);

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
	}, [userState]);

	// per users
	useEffect(() => {
		if (load < 2) {
			setLoad(load + 1);
		}

		if (users && load < 2 && load > 0) {
			const newUserBooleans = [];
			users.map((_) => newUserBooleans.push(false));
			setUsersBoolean(newUserBooleans);
			if (editChannel) {
				const userIds = Object.values(userState).map((user) => user.id);
				console.log('userIds', userIds);
				console.log('usersChannels', usersChannels);
				console.log('newUsersBooleans (before)', newUserBooleans);
				usersChannels.forEach((uc, index) => {
					if (userIds.includes(uc.user_id) && uc.user_id !== 1) {
						console.log('index', index);
						newUserBooleans[uc.user_id - 2] = !newUserBooleans[uc.user_id - 2];
					}
				});

				console.log('newUsersBooleans (after)', newUserBooleans);
				setUsersBoolean(newUserBooleans);
			}
		}
	}, [users, load, usersBoolean, usersChannels]);

	// per usersBoolean
	useEffect(() => {
		// nothing for now
	}, [usersBoolean]);

	// useEffect per usersChannelsState
	useEffect(() => {
		setUsersChannels(
			usersChannelsState.filter((uc) => uc.channel_id === currentChannelId)
		);
	}, [usersChannelsState]);

	// function to handle add members
	const addMembers = (e) => {
		// prevent page from refreshing
		e.preventDefault();

		// reset input length

		// if input length is greater than 0, proceed to posting new channel

		// get all users who is in current channels

		// reset userToAdd
		setInputLength(0);
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

		//? call on thunk to edit current channel and add people
		if (inputLength > 0) {
			usersToAdd.map((user) => {
				dispatch(
					channelActions.thunkPutAddUserToChannel(createdChannelId, user)
				).then(() => {
					setAddPeopleModal(false);
				});
			});
		} else {
			setAddPeopleModal(false);
		}

		//? After getting channel page in chat page, navigate to specific channel
		// navigate to channel page
		return history.push(`/chat/channels/${createdChannelId}`);
	};

	return (
		<section id='apm-container'>
			<form id='apm-form' onSubmit={addMembers}>
				<h2>Add people</h2>
				<p># {channelName}</p>
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
							Add
						</button>
					}
				</figure>
			</form>
		</section>
	);
};

// export component
export default AddPeopleModal;
