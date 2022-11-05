// src/components/MessagePage/LeftBar/CreateChannelModal/CreateChannelModal.js

// import css
import './CreateChannelModal.css';

// import context
import { useChannel } from '../../../../context/ChannelContext';
import { Modal } from '../../../../context/Modal';
import { useMessage } from '../../../../context/MessageContext';

// import react
import { useState, useEffect } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import react-router-dom
import { useHistory, useParams } from 'react-router-dom';

// import store
import * as sessionActions from '../../../../store/session';
import * as channelActions from '../../../../store/channel';

//? CreateChannelModal component
const CreateChannelModal = ({ setCreateChannelOpenModal }) => {
	/**
	 * Controlled inputs
	 */
	const { channelName, setChannelName } = useMessage();
	const { addPeopleModal, setAddPeopleModal } = useMessage();
	const { privateChannel, setPrivateChannel } = useChannel();
	const { createdChannelId, setCreatedChannelId } = useChannel();
	const { currentChannel, setCurrentChannel } = useChannel();
	const { editChannel, setEditChannel } = useChannel();
	const [inputLength, setInputLength] = useState(0);
	const [formReady, setFormReady] = useState(true);
	const [validationErrors, setValidationErrors] = useState([]);
	const [onLoad, setOnLoad] = useState(false);
	const { currentChannelId, setCurrentChannelId } = useChannel();

	// deconstruct channelId
	let { channelId, dmrId } = useParams();

	channelId = Number(channelId);
	dmrId = Number(dmrId);

	const chatId = channelId ? channelId : dmrId;

	// selector functions
	const currentChat = useSelector(channelActions.getChatById(chatId));
	const currentUserId = useSelector(sessionActions.getCurrentUserId);
	const channelState = useSelector(channelActions.getAllChannels);

	// invoke dispatch
	const dispatch = useDispatch();

	// invoke history
	const history = useHistory();

	// useEffect to update on load
	useEffect(() => {
		if (!formReady) {
			setFormReady(true);
		}

		if (currentChannelId) {
			history.push(`/chat/channels/${currentChannelId}`);
		}
	}, [
		channelName,
		privateChannel,
		inputLength,
		currentUserId,
		formReady,
		channelState,
		validationErrors,
		setCurrentChannelId,
	]);

	// per editChannel
	useEffect(() => {
		setOnLoad(true);

		if (editChannel) {
			setChannelName(currentChannel.channel_name);
		} else {
			setChannelName('');
		}
	}, [onLoad, editChannel]);

	// function to check input length of channel name inputted
	const checkInputLength = (e) => {
		// check if input have value
		setInputLength(e.target.value.trim().length);
	};

	const onCreateChannel = async (e) => {
		// prevent page from refreshing
		e.preventDefault();

		// channel information
		const channelInfo = {
			...currentChannel,
			owner_id: currentUserId,
			channel_name: channelName,
			public: !privateChannel,
		};

		// reset validation errors
		setValidationErrors([]);

		return dispatch(
			editChannel
				? channelActions.thunkPutChannel(channelInfo, currentChannel.id)
				: channelActions.thunkPostNewChannel(channelInfo)
		)
			.then((res) => {
				if (!editChannel && res) {
					const currentCreatedChannelId = res.new_channel.id;
					setCreatedChannelId(currentCreatedChannelId);
				} else if (res) {
					setCreatedChannelId(res.id);
				} else {
					throw new Error();
				}
			})
			.then(() => dispatch(channelActions.thunkGetUserChannels()))
			.then(() => {
				// exit out the modal
				setCreateChannelOpenModal(false);
				setAddPeopleModal(true);
			})
			.catch(() => {
				setValidationErrors([
					'Channel name already exists. Please try again with different name.',
				]);
			});
	};

	// function to update channel name
	const updateChannelName = (e) => {
		// set channel name
		setChannelName(e.target.value);
	};

	return onLoad ? (
		<section id='ccm-container'>
			<form id='ccm-form' onSubmit={onCreateChannel}>
				{/* form header */}
				{!editChannel ? (
					privateChannel ? (
						<h1>Create a private channel</h1>
					) : (
						<h1>Create a channel</h1>
					)
				) : (
					<h1>Edit channel {currentChannel.channel_name}</h1>
				)}

				{/* exit icon */}
				<figure
					id='ccm-form-exit-container'
					onClick={(_) => setCreateChannelOpenModal(false)}
				>
					<i className='fa-solid fa-x ccm-form-exit'></i>
				</figure>

				{/* validation errors: catch channel creating errors */}
				<div className='epm-error-container'>
					{validationErrors &&
						validationErrors.map((error, ind) => <div key={ind}>{error}</div>)}
				</div>

				{/* channel name */}
				<p>
					Channels are where your team communicates. They're best when organized
					around a topic — #marketing, for example.
				</p>
				<label htmlFor='channel_name'>
					Name
					{50 - inputLength < 0 && (
						<span id='ccmf-label-span'>
							Channel names can't be longer than 80 characters.
						</span>
					)}
				</label>
				<figure className='ccmf-input-figure'>
					{privateChannel ? (
						<i className='fa-solid fa-lock'></i>
					) : (
						<i className='fa-solid fa-hashtag'></i>
					)}
					<input
						name='channel_name'
						placeholder='e.g. plan-budget'
						id='ccmf-cn-input'
						className={`ccmf-cn-input-${50 - inputLength < 0}`}
						value={channelName}
						onInput={checkInputLength}
						onChange={updateChannelName}
					/>
					<span
						id='ccmf-input-span'
						className={`ccmf-input-span-${50 - inputLength < 0}`}
					>
						{50 - inputLength}
					</span>
				</figure>

				{/* channel privacy */}

				{editChannel ? (
					<aside id='ccmf-private-aside-edit' />
				) : (
					<aside id='ccmf-private-aside'>
						<section id='ccmf-private-section'>
							<p>Make private</p>
							{privateChannel ? (
								<p>
									This can’t be undone. A private channel cannot be made public
									later on.
								</p>
							) : (
								<p>
									When a channel is set to private, it can only be viewed or
									joined by invitation
								</p>
							)}
						</section>
						<input
							type='checkbox'
							id='private-switch'
							onClick={(e) => {
								setPrivateChannel(e.target.checked);
							}}
						/>
					</aside>
				)}

				{/* channel submit button */}
				<figure id='ccm-button-container'>
					{editChannel ? (
						(inputLength > 0 && inputLength <= 50) ||
						channelName === currentChannel.channel_name ? (
							<button
								id='ccmf-submit-button'
								type='submit'
								className={`ccmf-submit-button-true`}
							>
								Edit
							</button>
						) : (
							<button
								id='ccmf-submit-button'
								type='button'
								className={`ccmf-submit-button-false`}
							>
								Edit
							</button>
						)
					) : inputLength > 0 && inputLength <= 50 ? (
						<button
							id='ccmf-submit-button'
							type='submit'
							className={`ccmf-submit-button-${
								inputLength > 0 && inputLength <= 50
							}`}
						>
							Create
						</button>
					) : (
						<button
							id='ccmf-submit-button'
							type='button'
							className={`ccmf-submit-button-${
								inputLength > 0 && inputLength <= 50
							}`}
						>
							Create
						</button>
					)}
				</figure>
			</form>
			{/* Edit Profile Modal */}
		</section>
	) : (
		setOnLoad(true)
	);
};

// export component
export default CreateChannelModal;
