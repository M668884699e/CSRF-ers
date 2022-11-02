// src/components/MessagePage/LeftBar/RightClickModal/RightClickModal.js

// import context
import { useChannel } from '../../../../context/ChannelContext';
import { useMessage } from '../../../../context/MessageContext';

// import css
import './RightClickModal.css';

// import react-redux
import { useSelector, useDispatch } from 'react-redux';

// import store
import * as channelActions from '../../../../store/channel';
import { useEffect } from 'react';

//? RightClickModal component
const RightClickModal = ({ setRightClickModal, rect }) => {
	const { createChannelOpenModal, setCreateChannelOpenModal } = useMessage();
	const { editChannel, setEditChannel } = useChannel();
	const { currentChannel, setCurrentChannel } = useChannel();

	// selector function
	const channelState = useSelector(channelActions.getAllChannels);

	// invoke dispatch
	const dispatch = useDispatch();

	useEffect(() => {}, [channelState]);

	// function to handle delete user
	const handleDeleteChannel = () => {
		var confirmDelete = prompt(
			`Are you sure you want to delete channel ${currentChannel.channel_name}? Type 'delete' to confirm`
		);

		// if 'delete' is the input, proceed to delete account
		if (confirmDelete && confirmDelete.toLowerCase().trim() === 'delete') {
			// alert to user, successful deletion
			alert(`Channel ${currentChannel.channel_name} have been deleted`);

			// call on thunk to delete current user
			return dispatch(channelActions.thunkDeleteChannel(currentChannel.id))
				.then(() => dispatch(channelActions.thunkGetUserChannels()))
				.then(() => {
					// call on thunk to log out user
					setRightClickModal(false);
				});
		}
	};

	return (
		<section
			style={{
				top: rect.top,
				left: rect.left,
				right: rect.right,
				bottom: rect.bottom,
				position: 'absolute',
			}}
			id='rcm-section'
		>
			<figure id='rcm-fig-1'>
				<p
					onClick={(_) => {
						setCreateChannelOpenModal(true);
						setEditChannel(true);
						setRightClickModal(false);
					}}
				>
					Edit channel
				</p>
			</figure>
			<figure id='rcm-fig-2'>
				<p onClick={handleDeleteChannel}>Leave channel</p>
			</figure>
		</section>
	);
};

// export component
export default RightClickModal;
