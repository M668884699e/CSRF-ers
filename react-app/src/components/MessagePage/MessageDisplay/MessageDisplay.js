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
import * as channelActions from '../../../store/channel';

const MessageDisplay = () => {
	/**
	 *  Controlled Inputs
	 */
	// get all messages that belong to current channel
	const [messages, setMessages] = useState([]);
	const [currentChatName, setCurrentChatName] = useState(false);

	// deconstruct channelId
	let { channelId, dmrId } = useParams();

	channelId = Number(channelId);
	dmrId = Number(dmrId);

	const chatId = channelId ? channelId : dmrId;

	// use selector
	const currentUserId = useSelector(sessionActions.getCurrentUserId);
	const currentChat = useSelector(channelActions.getChatById(chatId));

	// invoke dispatch
	const dispatch = useDispatch();

	// redux state
	const messageState = useSelector(messageActions.getAllMessages);
	const usersState = useSelector(userActions.getAllUsers);

	// per message state
	useEffect(() => {
		dispatch(messageActions.thunkGetChannelMessages(chatId));
		dispatch(userActions.thunkGetAllUsers());
	}, [dispatch, chatId]);

	// per messageState
	useEffect(() => {
		if (Object.values(messageState).length > 0) {
			const currentMessages = Object.values(messageState).filter((message) => {
				return message.messageable_id === chatId;
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
						<button id='message-main-header-name'>
							{currentChat.channel_name}
						</button>
						<aside id='message-main-header-link'>
							Zoom Link:{' '}
							<a href='https://us02web.zoom.us/j/84596241408?pwd=Q0NUYTBLWTJxVk1rbWd3b1B3dTZVQT09#success'>
								https://us02web.zoom.us/j/84596241408?pwd=Q0NUYTBLWTJxVk1rbWd3b1B3dTZVQT09#success
							</a>
						</aside>
					</section>
					<section id='message-main-header-right'>
						{/* BJM: todo on click display modal of members, incorporate centralized slack modal */}
						<button>Members</button>
					</section>
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
