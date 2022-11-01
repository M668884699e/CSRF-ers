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
import { useHistory } from 'react-router-dom';

// import store
import * as sessionActions from '../../../../store/session';
import * as channelActions from '../../../../store/channel';

//? CreateChannelModal component
const CreateChannelModal = ({ setCreateChannelOpenModal }) => {
	/**
	 * Controlled inputs
	 */
	const [inputLength, setInputLength] = useState(0);
	const { channelName, setChannelName } = useMessage();
	const { privateChannel, setPrivateChannel } = useChannel();
	const [formReady, setFormReady] = useState(true);
	const { addPeopleModal, setAddPeopleModal } = useMessage();
	const { createdChannelId, setCreatedChannelId } = useChannel();
	
	// selector functions
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
	}, [
		channelName,
		privateChannel,
		inputLength,
		currentUserId,
		formReady,
		channelState,
	]);

	// function to check input length of channel name inputted
	const checkInputLength = (e) => {
		// check if input have value
		setInputLength(e.target.value.length);
	};

	const onCreateChannel = async (e) => {
		// prevent page from refreshing
		e.preventDefault();

		// channel information
		const channelInfo = {
			owner_id: currentUserId,
			channel_name: channelName,
			public: !privateChannel,
		};

		return dispatch(channelActions.thunkPostNewChannel(channelInfo))
			.then(res => {
				const newChannelId = res.new_channel.id;
				setCreatedChannelId(newChannelId);
			})
			.then(() => dispatch(channelActions.thunkGetUserChannels()))
			.then(() => {
				// exit out the modal
				setCreateChannelOpenModal(false);
				setAddPeopleModal(true);
			});
	};

	// function to update channel name
	const updateChannelName = (e) => {
		// set channel name
		setChannelName(e.target.value);
	};

	return (
		<section id='ccm-container'>
			<form id='ccm-form' onSubmit={onCreateChannel}>
				{/* form header */}
				{privateChannel ? (
					<h1>Create a private channel</h1>
				) : (
					<h1>Create a channel</h1>
				)}

				{/* exit icon */}
				<figure
					id='ccm-form-exit-container'
					onClick={(_) => setCreateChannelOpenModal(false)}
				>
					<i className='fa-solid fa-x ccm-form-exit'></i>
				</figure>

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

				{/* channel submit button */}
				<figure id='ccm-button-container'>
					{inputLength > 0 && inputLength <= 50 ? (
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
	);
};

// export component
export default CreateChannelModal;