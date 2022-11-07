// import context
import { useStarter } from '../../../../context/StarterContext';
import { useUsers } from '../../../../context/UserContext';
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

// import css
import './MembersStarterForm.css';

const MembersStarterForm = ({ privateChannel }) => {
	/**
	 * Controlled Inputs
	 */
	const { channelNameInputted, setChannelNameInputted } = useStarter();
	const { channelInputted, setChannelInputted } = useStarter();
	const { inputLength, setInputLength } = useStarter();
	const { firstActive, setFirstActive } = useStarter();
	const { secondActive, setSecondActive } = useStarter();
	const { users, setUsers } = useUsers();
	const { usersBoolean, setUsersBoolean } = useUsers();
	const { loadedSelectUser, setLoadedSelectUser } = useUsers();
	const [validationErrors, setValidationErrors] = useState([]);

	let usersIndexes = [];

	// selector functions
	const userState = useSelector(userActions.getAllUsers);

	// invoke dispatch
	const dispatch = useDispatch();

	// invoke history
	const history = useHistory();

	// get current user id
	const getCurrentUserId = useSelector(sessionActions.getCurrentUserId);

	// on load
	useEffect(() => {
		// set channel inputted name
		setChannelInputted(true);

		// reset input length
		setInputLength(0);

		// get users
		dispatch(userActions.thunkGetAllUsers());

		// set secondActive as true (for Direct messages)
		setFirstActive(false);
		setSecondActive(true);
	}, [dispatch]);

	// per userState
	useEffect(() => {
		// filter for noncurrent users only
		if (userState) {
			const filteredUsers = Object.values(userState).filter(
				(user) => user.id !== getCurrentUserId
			);
			setUsers(filteredUsers);
		}
	}, [userState]);

	// per users
	useEffect(() => {
		const newUserBooleans = [];
		users.map((_) => newUserBooleans.push(false));
		setUsersBoolean(newUserBooleans);
	}, [users]);

	// function to handle add members
	const addMembers = (e) => {
		// prevent page from refreshing
		e.preventDefault();

		// reset input length
		setInputLength(0);

		// if input length is greater than 0, proceed to posting new channel
		if (inputLength > 0) {
			// reset userToAdd
			usersIndexes = [];

			// select all list that are selected
			const allTrue = document.querySelectorAll(
				"li[class*='spmsf-members-li-'][class$='-true']"
			);

			// push all selected list to usersIndexes
			Object.values(allTrue).map((currMember) =>
				usersIndexes.push(Number(currMember.className.split('-')[3]))
			);

			submitChannel();
		}
	};

	// function to submit channel to add
	const submitChannel = async () => {
		// get all user ids from users index
		const usersToAdd = usersIndexes.map((userIndex) => users[userIndex].id);

		// call on thunk to post new channel
		return dispatch(
			channelActions.thunkPostNewChannel({
				owner_id: getCurrentUserId,
				channel_name: channelNameInputted,
				public: !privateChannel,
				user_ids: `${usersToAdd}`,
			})
		)
			.then(async (res) => {
				//? After getting channel page in chat page, navigate to specific channel
				// console.log('res before if/else errors', await res.json());
				if (!res.errors) {
					const newChannelId = res.new_channel.id;
					return history.push(`/chat/channels/${newChannelId}`);
				} else {
					throw new Error();
				}
			})
			.catch(() => {
				setValidationErrors([
					'Channel name already exists. Go back and retry with different name.',
				]);
			});
	};

	return (
		<form className='sp-main-section-form'>
			<p id='spmsf-p-step'>Step 2 of 2</p>
			<div className='epm-error-container'>
				{validationErrors &&
					validationErrors.map((error, ind) => <div key={ind}>{error}</div>)}
			</div>
			<h2 id='spmsf-h2'>Who else is on the {channelNameInputted} team?</h2>
			{/* container for choosing user */}
			<section id='spmsf-members-section'>
				{/* get list of available users */}
				<ul id='spmsf-members-ul'>
					{users.map((user, index) => {
						return (
							<li
								key={user.id}
								value={user.id}
								id={`spmsf-members-li-${index}`}
								className={`spmsf-members-li-${index}-${usersBoolean[index]}`}
								onClick={(_) => {
									// set user boolean on click
									const newUserBooleans = usersBoolean;
									newUserBooleans[index] = !newUserBooleans[index];
									setUsersBoolean(newUserBooleans);

									// update class name
									document.querySelector(
										`#spmsf-members-li-${index}`
									).className = `spmsf-members-li-${index}-${usersBoolean[index]}`;

									// select all list that are selected
									const allTrue = document.querySelectorAll(
										"li[class*='spmsf-members-li-'][class$='-true']"
									);

									setInputLength(allTrue.length);
									setLoadedSelectUser(loadedSelectUser + 1);
								}}
							>
								<figure className='spmsf-members-img-container'>
									<img
										className='spmsf-members-img'
										src={user.profile_image}
										alt={user.display_name}
									/>
								</figure>
								<span className='spmsf-members-dn'>{user.display_name}</span>
								<span className='spmsf-members-user-status'>
									<i className='fa-regular fa-circle fa-xs'></i>
								</span>
								<span className='spmsf-members-fn'>{user.first_name}</span>
								<span className='spmsf-members-ln'>{user.last_name}</span>
								<span className='spmsf-members-email'>{user.email}</span>
							</li>
						);
					})}
				</ul>
			</section>

			{/* on click of button, take to add people component */}
			<button
				id='spmsf-submit-button'
				className={`spmsf-submit-button-${inputLength > 0}`}
				onClick={addMembers}
			>
				Create Channel
			</button>
		</form>
	);
};

export default MembersStarterForm;
