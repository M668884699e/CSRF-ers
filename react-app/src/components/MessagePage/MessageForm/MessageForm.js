// css
import './MessageForm.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as messageActions from '../../../store/message';

// import Lexical field
import { Editor } from '../../Editor/Editor';
import { useSelector, useDispatch } from 'react-redux';

import { getChatById } from '../../../store/channel';
import { thunkGetChannelMessages } from '../../../store/message';
import { thunkGetAllDmrMessages } from '../../../store/dmr';

// import context
import { useChannel } from '../../../context/ChannelContext';

const MessageForm = ({ edit = false, messageId }) => {
	const dispatch = useDispatch();
	const messages = useSelector((state) => state.messages);

	const [currentMessage, setCurrentMessage] = useState(
		edit
			? Object.values(messages).find((message) => message.id === messageId)
			: ''
	);

	const { currentChannel, setCurrentChannel } = useChannel();
	const [inputLength, setInputLength] = useState(0);

	// message post details
	const [message, setMessage] = useState('');
	const [messageable_type, setMesseageble_type] = useState('channels');
	const [messageableUrl, setMessageableUrl] = useState(
		window.location.href.split('/')[4]
	);

	// grab type of message from url then convert it into proper value
	// let messageableUrl = window.location.href.split('/')[4];

	// convert messageableUrl val into messeagable_type val
	// let messageable_type
	useEffect(() => {
		if (messageableUrl === 'channels') {
			setMesseageble_type(
				messageableUrl[0].toUpperCase() + messageableUrl.slice(1, -1)
			);
		} else if (messageableUrl === 'dmrs') {
			setMesseageble_type(messageableUrl.slice(0, -1).toUpperCase());
		}

		if (edit) {
			setMessage(currentMessage.message);
		} else {
			setMessage('');
		}
	}, [dispatch, messageableUrl, edit]);

	useEffect(() => {
		// per current message
	}, [currentMessage]);

	useEffect(() => {
		// nothing for now, just to update variables
	}, [messageable_type, inputLength]);

	// function to check input length of channel name inputted
	const checkInputLength = (e) => {
		setInputLength(e.target.value.trim().length);
	};

	// userId
	const userId = useSelector((state) => state.session.user.id);

	// deconstruct channelId
	let { channelId, dmrId } = useParams();

	channelId = Number(channelId);
	dmrId = Number(dmrId);

	const chatId = channelId ? channelId : dmrId;

	const messagePost = async (e) => {
		e.preventDefault();

		const newMessage = {
			...currentMessage,
			message,
			messageable_id: chatId,
			messageable_type,
			sender_id: userId,
		};

		setInputLength(0);

		if (!edit) {
			return await dispatch(messageActions.thunkCreateMessage(newMessage)).then(
				() => {
					setMessage('');
					dispatch(thunkGetChannelMessages(chatId, messageableUrl));
				}
			);
		} else {
			return await dispatch(messageActions.thunkPutMessage(newMessage)).then(
				() => {
					setMessage('');
					dispatch(thunkGetChannelMessages(chatId, messageableUrl));
				}
			);
		}
	};

	// function to handle updating message
	const updateMessage = (e) => {
		setMessage(e.target.value);
	};

	// function to handle enter key for textareafield
	const onEnterPress = (e) => {
		if (e.keyCode === 13 && e.shiftKey == false) {
			e.preventDefault();
			return messagePost(e);
		}
	};

	// load form to create message
	const loadMessageForm = () => {
		return (
			<form onSubmit={messagePost} id='message-form'>
				{/* <Editor /> */}
				<figure id='message-textarea-figure'>
					<textarea
						id='message-field'
						name='message'
						type='text'
						placeholder={`Message #${
							currentChannel && currentChannel.channel_name
						}`}
						onKeyDown={onEnterPress}
						onInput={checkInputLength}
						value={message}
						onChange={updateMessage}
					/>
				</figure>

				{inputLength > 0 ||
				(edit && currentMessage.message.trim() === message.trim()) ? (
					<figure
						id='message-button-figure'
						className='message-button-figure-true'
					>
						<button
							type='submit'
							id='message-button'
							className='message-button-true'
						>
							<i className='fa-solid fa-paper-plane'></i>
						</button>
					</figure>
				) : (
					<figure
						id='message-button-figure'
						className='message-button-figure-false'
					>
						<button
							type='button'
							id='message-button'
							className='message-button-false'
						>
							<i className='fa-solid fa-paper-plane'></i>
						</button>
					</figure>
				)}
			</form>
		);
	};

	return <section id='message-form-container'>{loadMessageForm()}</section>;
};

export default MessageForm;
