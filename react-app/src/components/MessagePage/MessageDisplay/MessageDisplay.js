// import css
import './MessageDisplay.css';

// BJM todo: set up react components

// import react
import { useEffect, useState } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import react-router-dom
import { NavLink, useParams } from 'react-router-dom';

// import store
import * as messageActions from '../../../store/message';
import * as userActions from '../../../store/users';
import * as sessionActions from '../../../store/session';

const MessageDisplay = () => {
	/**
	 *  Controlled Inputs
	 */
	// get all messages that belong to current channel
	const [messages, setMessages] = useState([]);
	const currentUserId = useSelector(sessionActions.getCurrentUserId);

	// invoke dispatch
	const dispatch = useDispatch();

	// redux state
	const messageState = useSelector(messageActions.getAllMessages);
	const usersState = useSelector(userActions.getAllUsers);

	// deconstruct channelId
	const channelId = Number(useParams().channelId);

	// per message state
	useEffect(() => {
		dispatch(messageActions.thunkGetChannelMessages(channelId));
		dispatch(userActions.thunkGetAllUsers());
	}, [dispatch, channelId]);

	// per messageState
	useEffect(() => {
		if (Object.values(messageState).length > 0) {
			const currentMessages = Object.values(messageState).filter((message) => {
				return message.messageable_id === channelId;
			});

			setMessages(currentMessages);
		}
	}, [messageState, usersState]);

	return (
		Object.values(usersState).length > 0 && (
			<section id='message-display-main'>
				<section id='message-main-header'>
					<section id='message-main-header-left'>
						{/* BJM todo: Implement a button add feature maintaining css */}
						<button id='message-main-header-name'>Test Message Name</button>
						<aside id='message-main-header-link'>
							Zoom Link:{' '}
							<a href='https://www.google.com'>https://www.google.com</a>
						</aside>
					</section>
					<section id='message-main-header-right'>
						{/* BJM: todo on click display modal of members, incorporate centralized slack modal */}
						<button>Members</button>
					</section>
				</section>
				<section id='message-sub-header'>
					<aside className='message-sub-header-section'>
						<button className='message-sub-header-buttons'>0 Pinned</button>
					</aside>
					<aside className='message-sub-header-section'>
						<button className='message-sub-header-buttons'>
							+ Add a bookmark
						</button>
					</aside>
					<aside className='message-sub-header-section'>
						{/* BJM: todo add button header feature, in depth look needed */}
						<button className='message-sub-header-buttons'>+</button>
					</aside>
				</section>
				{/* BJM: todo create loop of messages grabbing all messages in channel */}
				<section id='message-display-container'>
					{Object.values(messageState).length > 0 &&
						messages.map((message) => (
							<section className='message' key={message.id}>
								<aside className='profile-pic'>
									<img
										src={
											Object.values(usersState).find(
												(user) => user.id === message.sender_id
											).profile_image
										}
									/>
									<p>
										{
											Object.values(usersState).find(
												(user) => user.id === message.sender_id
											).display_name
										}
									</p>
								</aside>
								<aside>{message.message}</aside>
							</section>
						))}
				</section>
			</section>
		)
	);
};

export default MessageDisplay;
