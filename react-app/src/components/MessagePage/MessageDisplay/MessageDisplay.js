// import css
import './MessageDisplay.css';

// import component
import ShowMembersModal from './ShowMembersModal';
import AlwaysScrollToBottom from './AlwaysScrollToBottom';

// import context
import { useChannel } from '../../../context/ChannelContext';
import { useMessage } from '../../../context/MessageContext';
import { Modal } from '../../../context/Modal';

//! BJM todo: set up react components

// import react
import { useEffect, useState, useRef } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import react-router-dom
import { NavLink, useParams } from 'react-router-dom';

// import store
import * as messageActions from '../../../store/message';
import * as userActions from '../../../store/users';
import * as sessionActions from '../../../store/session';
import * as channelActions from '../../../store/channel';
import * as dmrActions from '../../../store/dmr';
import MessageForm from '../MessageForm';

const MessageDisplay = () => {
	/**
	 *  Controlled Inputs
	 */
	// get all messages that belong to current channel
	const [rect, setRect] = useState(0);
	const [messages, setMessages] = useState([]);
	const { rightClickModal, setRightClickModal } = useMessage();
	const { currentChannel, setCurrentChannel } = useChannel();
	const [membersModal, setMembersModal] = useState(false);
	const messagesEndRef = useRef(null);
	const [delayHandler, setDelayHandler] = useState(null);
	const [messageBooleans, setMessageBooleans] = useState([]);

	// deconstruct channelId
	let { channelId, dmrId } = useParams();

	channelId = Number(channelId);
	dmrId = Number(dmrId);

	const chatId = channelId ? channelId : dmrId;

	// use selector
	const currentChat = useSelector(
		channelId
			? channelActions.getChatById(chatId)
			: dmrActions.getChatById(chatId)
	);

	// invoke dispatch
	const dispatch = useDispatch();

	// redux state
	const messageState = useSelector(messageActions.getAllMessages);
	const usersState = useSelector(userActions.getAllUsers);

	// per message state
	useEffect(() => {
		dispatch(
			channelId
				? messageActions.thunkGetChannelMessages(chatId)
				: messageActions.thunkGetChannelMessages(chatId, 'dmr')
		);
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

	// per message
	useEffect(() => {
		const newMessageBooleans = [];
		messages.map((_) => newMessageBooleans.push(false));
		setMessageBooleans(newMessageBooleans);
	}, [messages]);

	// per message booleans
	useEffect(() => {
		// nothing for now
	}, [messageBooleans]);

	// per current chat
	useEffect(() => {
		if (currentChat) {
			setCurrentChannel(currentChat);
		}
	}, [currentChat]);

	// function to handle delete message
	const handleDeleteMessage = (message) => {
		// if channel, delete channel message then get channel message
		// vice versa for dmr
		dispatch(messageActions.thunkDeleteMessage(message)).then(() => {
			dispatch(
				channelId
					? messageActions.thunkGetChannelMessages(chatId)
					: messageActions.thunkGetChannelMessages(chatId, 'dmr')
			);
		});
	};

	const handleEditMessage = (index) => {
		// turn current section into textarea
		const newMessageBooleans = messageBooleans.slice();
		newMessageBooleans[index] = !newMessageBooleans[index];
		setMessageBooleans(newMessageBooleans);
	};

	return Object.values(usersState).length > 0 && currentChat ? (
		<section id='message-display-main'>
			<section id='message-main-header'>
				<section id='message-main-header-left'>
					{/* Implement a button add feature maintaining css */}
					<button id='message-main-header-name'>
						{Object.values(currentChat).length > 0
							? currentChat.channel_name
								? currentChat.channel_name.length > 40
									? currentChat.channel_name.slice(0, 40) + '...'
									: currentChat.channel_name.slice(0, 40)
								: currentChat.dmr_name.length > 40
									? currentChat.dmr_name.slice(0, 40) + '...'
									: currentChat.dmr_name.slice(0, 40)
							: ''}
					</button>
				</section>
				<section id='message-main-header-right'>
					{/* BJM: todo on click display modal of members, incorporate centralized slack modal */}
					<button onClick={(_) => setMembersModal(true)}>Members</button>
				</section>
			</section>
			{/* Create loop of messages grabbing all messages in channel */}
			<section id='message-display-container'>
				{typeof messageState === 'object' &&
					messageState &&
					Object.values(messageState).length > 0 &&
					messages.map((message, index) =>
						messageBooleans[index] === true ? (
							<section
								id='message'
								className={`mdc-message-${messageBooleans[index]}`}
								key={message.id}
							>
								<aside className='profile-pic'>
									<img
										src={
											Object.values(usersState).find(
												(user) => user.id === message.sender_id
											).profile_image
										}
									/>
								</aside>
								<MessageForm edit={true} messageId={message.id} />
							</section>
						) : (
							<section
								id='message'
								className={`mdc-message-${messageBooleans[index]}`}
								key={message.id}
							>
								<aside className='profile-pic'>
									<img
										src={
											Object.values(usersState).find(
												(user) => user.id === message.sender_id
											).profile_image
										}
									/>
								</aside>
								<aside className='profile-name'>
									{
										Object.values(usersState).find(
											(user) => user.id === message.sender_id
										).display_name
									}
									<aside className='message-text'>{message.message}</aside>
								</aside>
								<section id='mhm-section'>
									<figure
										onClick={(e) => {
											e.stopPropagation();
											handleEditMessage(index);
										}}
									>
										<i className='fa-solid fa-pen-to-square edit-message'></i>
									</figure>
									<figure onClick={(_) => handleDeleteMessage(message)}>
										<i className='fa-solid fa-trash delete-message'></i>
									</figure>
								</section>
							</section>
						)
					)}
				{/* allow for always scroll to bottom */}
				<AlwaysScrollToBottom />
			</section>
			{/* {showMembersModal && (
				<Modal onClose={(_) => setShowMembersModal(false)}>
					<ShowMembersModal setShowMembersModal={setShowMembersModal} />
				</Modal>
			)} */}
			{membersModal && (
				<Modal onClose={(_) => setMembersModal(false)} currentVisible={false}>
					<ShowMembersModal setMembersModal={setMembersModal} />
				</Modal>
			)}
		</section>
	) : (
		<section id='message-display-main'>Message not available. TBD</section>
	);
};

export default MessageDisplay;
