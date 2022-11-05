// src/components/MessagePage/MessageDisplay/ShowMembersModal/ShowMembersModal.js

// import css
import './ShowMembersModal.css';

// import context
import { useChannel } from '../../../../context/ChannelContext';
import { useParams } from 'react-router-dom';

// import react
import { useEffect, useState } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import store
import * as userActions from '../../../../store/users';

//? ShowMembersModal component
const ShowMembersModal = ({ setMembersModal }) => {
	// invoke dispatch
	const dispatch = useDispatch();
	const { channelId, dmrId } = useParams();
	const dmrUsers = useSelector((state) => Object.values(state.dmrUsers));
	const channelsUsers = useSelector((state) =>
		Object.values(state.channelsUsers)
	);
	const userState = useSelector((state) => (state.users ? state.users : state));
	const [users, setUsers] = useState([]);

	let chatId =
		window.location.pathname.split('/')[2] === 'channels'
			? Number(channelId)
			: Number(dmrId);

	useEffect(() => {
		const chatUsers = [];

		if (Array.isArray(channelsUsers) && channelsUsers.length > 0) {
			if (window.location.pathname.split('/')[2] === 'channels') {
				channelsUsers.forEach((users) => {
					if (Array.isArray(users)) {
						users.forEach((user) => {
							if (user.channel_id === chatId) {
								chatUsers.push(user.user_id);
							}
						});
					}
				});
			} else if (Array.isArray(dmrUsers) && dmrUsers.length > 0) {
				dmrUsers.forEach((users) => {
					if (Array.isArray(users)) {
						users.forEach((user) => {
							if (user.dmr_id === chatId) {
								chatUsers.push(user.user_id);
							}
						});
					}
				});
			}
		}

		setUsers(
			Object.values(userState).filter((user) => {
				if (chatUsers.includes(user.id)) {
					return user;
				}
			})
		);
	}, [userState, chatId]);

	// per users
	useEffect(() => {
		// nothing for now, just to update users
	}, [users]);

	return (
		<section id='smm-container'>
			<h2>Members</h2>
			{/* Get channel name */}
			<ul id='smm-members-ul'>
				{users &&
					users.map((user) => {
						return (
							<section id='smm-members-li'>
								{/* picture */}
								<figure id='smm-members-li-figure'>
									<img
										id='smm-members-li-img'
										src={user.profile_image}
										alt={user.display_name}
									/>
								</figure>

								{/* first name */}
								<span id='smm-span-fn'>{user.first_name}</span>

								{/* last name */}
								<span id='smm-span-ln'>{user.last_name}</span>

								{/* status */}
								<span id='smm-span-status'>
									<i className='fa-regular fa-circle fa-2xs'></i>
								</span>

								{/* display name */}
								<span id='smm-span-dn'>{user.display_name}</span>
							</section>
						);
						return <p>{user.display_name}</p>;
					})}
			</ul>
		</section>
	);
};

// export component
export default ShowMembersModal;
