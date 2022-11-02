// src/components/MessagePage/LeftBar/RightClickModal/RightClickModal.js

// import context
import { useChannel } from '../../../../context/ChannelContext';
import { useMessage } from '../../../../context/MessageContext';

// import css
import './RightClickModal.css';

// import react-redux
import { useSelector, useDispatch } from 'react-redux';

// import react-redux-dom
import { useHistory } from 'react-router-dom';

// import store
import * as channelActions from '../../../../store/channel';
import { useEffect } from 'react';

//? RightClickModal component
const RightClickModal = ({ setRightClickModal, rect }) => {
	const { createChannelOpenModal, setCreateChannelOpenModal } = useMessage();
	const { editChannel, setEditChannel } = useChannel();
	const { currentChannel, setCurrentChannel } = useChannel();
	const { currentChannelId, setCurrentChannelId } = useChannel();

	// selector function
	const channelState = useSelector(channelActions.getAllChannels);

	// invoke dispatch
	const dispatch = useDispatch();

	// invoke history
	const history = useHistory();

	useEffect(() => {
		// redirect to current channel id
		history.push(`/chat/channels/${currentChannelId}`);
	}, [channelState]);

	// function to handle delete user
	const handleDeleteChannel = async () => {
		var confirmDelete = prompt(
			`Are you sure you want to delete channel ${currentChannel.channel_name}? Type 'delete' to confirm`
		);

		// if 'delete' is the input, proceed to delete account
		if (confirmDelete && confirmDelete.toLowerCase().trim() === 'delete') {
			// alert to user, successful deletion
			alert(`Channel ${currentChannel.channel_name} have been deleted`);

			if (currentChannel.id) {
				// call on thunk to delete current user
				await dispatch(channelActions.thunkDeleteChannel(currentChannel.id));
				await dispatch(channelActions.thunkGetUserChannels());
				setRightClickModal(false);
				await history.push(`/chat/channels/${channelState[0]}`);

				// .then(() => {
				// 	dispatch(channelActions.thunkGetUserChannels());
				// })
				// .then(() =>
				// 	// () => {}
				// 	{
				// 		history.push(`/chat/channels/${channelState[0]}`);
				// 		setRightClickModal(false);
				// 	}
				// );
			}
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
