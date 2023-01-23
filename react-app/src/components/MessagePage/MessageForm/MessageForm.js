// css
import './MessageForm.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as messageActions from '../../../store/message';
import * as sessionActions from '../../../store/session';

// import Lexical field
import { Editor } from '../../Editor/Editor';
import { useSelector, useDispatch } from 'react-redux';

import { getChatById } from '../../../store/channel';
import { thunkGetChannelMessages } from '../../../store/message';
import { thunkGetAllDmrMessages } from '../../../store/dmr';
import { io } from "socket.io-client";

// import context
import { useChannel } from '../../../context/ChannelContext';
import { useMessage } from '../../../context/MessageContext';


let socket;

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

	// message useState for socket.io
	const [socketMessage, setSocketMessage] = useState([])

	const { routeType, setRouteType } = useMessage();

	// grab type of message from url then convert it into proper value
	// let routeType = window.location.href.split('/')[4];

	// convert routeType val into messeagable_type val
	// let messageable_type
	useEffect(() => {
		if (routeType === 'channels') {
			setMesseageble_type('Channel');
		} else if (routeType === 'dmr') {
			setMesseageble_type(routeType.toUpperCase());
		}

		if (edit) {
			setMessage(currentMessage.message);
		} else {
			setMessage('');
		}
	}, [dispatch, routeType, edit, routeType]);


	// useEffect for socket.io
	useEffect(() => {
		socket = io()

		socket.on("message", (data) => {
			setSocketMessage(socketMessage => [...socketMessage, data["message"]["message"]])
		})

		return (() => {
			socket.disconnect()
		})
	}, [])

	// useEffect(() => {
	// 	// per current message
	// }, [currentMessage]);

	// useEffect(() => {
	// 	// nothing for now, just to update variables
	// }, [messageable_type, inputLength]);

	// function to check input length of channel name inputted
	const checkInputLength = (e) => {
		setInputLength(e.target.value.trim().length);
	};

	// userId
	const userId = useSelector(sessionActions.getCurrentUserId);

	// deconstruct channelId
	let { channelId, dmrId } = useParams();

	channelId = Number(channelId);
	dmrId = Number(dmrId);

	const chatId = channelId ? channelId : dmrId;

	const messagePost = async (e) => {
		e.preventDefault();

		// Good for update message in socket.io maybe?
		// const newMessage = {
		// 	...currentMessage,
		// 	message: message.slice(0, 500),
		// 	messageable_id: chatId,
		// 	messageable_type,
		// 	sender_id: userId,
		// };

		// socket io message
		const newMessage = {
			message: message.slice(0, 500),
			messageable_id: chatId,
			messageable_type,
			sender_id: userId,
		};

		setInputLength(0);

		if (!edit) {
			return await dispatch(messageActions.thunkCreateMessage(newMessage)).then(
				(data) => {
					// to do, try adding in a key with data["id"]
					newMessage["id"] = data["id"]

					socket.send(newMessage)

					setMessage('');

					// dispatch(thunkGetChannelMessages(chatId, routeType));
				}
			);
		} else {
			return await dispatch(messageActions.thunkPutMessage(newMessage)).then(
				() => {
					setMessage('');
					dispatch(thunkGetChannelMessages(chatId, routeType));
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
						placeholder={`Message #${currentChannel &&
							currentChannel.channel_name &&
							currentChannel.channel_name.length > 0
							? currentChannel.channel_name.slice(0, 20) + '...'
							: currentChannel &&
								currentChannel.dmr_name &&
								currentChannel.dmr_name.length > 0
								? currentChannel.dmr_name
									.slice(currentChannel.dmr_name.indexOf(',') + 1)
									.slice(0, 20) + '...'
								: ''
							}`}
						onKeyDown={onEnterPress}
						onInput={checkInputLength}
						value={message}
						onChange={updateMessage}
					/>
				</figure>

				<p
					id='input-length-message'
					className={`input-length-message-${500 - inputLength >= 0}`}
				>
					{500 - inputLength + ' '}
					characters left
				</p>
				{(inputLength > 0 && 500 - inputLength >= 0) ||
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
