// src/components/MessagePage/LeftBar/RightClickModal/RightClickModal.js

// import context
import { useChannel } from '../../../../context/ChannelContext';
import { useDMR } from '../../../../context/DMRContext';
import { useMessage } from '../../../../context/MessageContext';

// import css
import './RightClickModal.css';

// import react
import { useState, useEffect } from 'react';

// import react-redux
import { useSelector, useDispatch } from 'react-redux';

// import react-redux-dom
import { useHistory, Redirect } from 'react-router-dom';

// import store
import * as channelActions from '../../../../store/channel';
import * as dmrActions from '../../../../store/dmr';
import * as sessionActions from '../../../../store/session';
import * as channelsUsersActions from '../../../../store/channels-users';

//? RightClickModal component
const RightClickModal = ({ setRightClickModal, rect }) => {
	const { createChannelOpenModal, setCreateChannelOpenModal } = useMessage();
	const { createDMROpenModal, setCreateDMROpenModal } = useMessage();
	const { editChannel, setEditChannel } = useChannel();
	const { currentChannel, setCurrentChannel } = useChannel();
	const { currentDMR, setCurrentDMR } = useDMR();
	const { currentChannelId, setCurrentChannelId } = useChannel();
	const { currentDMRId, setCurrentDMRId } = useDMR();
	const { channels, setChannels } = useChannel();
	const { checkRouteProperlyOwned, setCheckRouteProperlyOwned } = useMessage();

	// selector function
	const channelState = useSelector(channelActions.getAllChannels);
	const dmrState = useSelector(dmrActions.getAllDMRs);
	const currentUserId = useSelector(sessionActions.getCurrentUserId);

	// invoke dispatch
	const dispatch = useDispatch();

	// invoke history
	const history = useHistory();

	useEffect(() => {
		// nothing for now, just to update channel state

		// updating current channel id here
		if (currentDMR) setCurrentDMRId(currentDMR.id);
		if (currentChannel) setCurrentChannelId(currentChannel.id);
	}, [dispatch, channelState, dmrState]);

	// per channels
	useEffect(() => {
		// nothing for now

		// if routeType is channel, check channel via channels by id,
		// see if current channel is owned by current session user
		// otherwise, hide it
		// for dmr, just hide it
		// console.log('checkRouteProperlyOwned', checkRouteProperlyOwned);
	}, [channels, checkRouteProperlyOwned, channelState]);

	// useEffect(() => {
	// 	setCurrentDMRId(currentDMR.id)
	// }, [dmrState, currentDMRId])

	// function to handle delete user for channel
	const handleDeleteChannel = async () => {
		var confirmDelete = prompt(
			`Are you sure you want to delete channel ${currentChannel.channel_name}? Type 'delete' to confirm`
		);

		// if 'delete' is the input, proceed to delete account
		if (confirmDelete && confirmDelete.toLowerCase().trim() === 'delete') {
			// alert to user, successful deletion
			alert(`Channel ${currentChannel.channel_name} has been deleted`);

			if (currentChannel.id) {
				// call on thunk to delete current user
				dispatch(channelActions.thunkDeleteChannel(currentChannel.id));
				dispatch(channelActions.thunkGetUserChannels());
				setRightClickModal(false);
				return history.push(
					`/chat/channels/${channelState ? channelState[0].id : 0}`
				);
			}
		}
	};

	// function to handle delete user for channel
	const handleLeaveChannel = async () => {
		var confirmDelete = prompt(
			`Are you sure you want to leave channel ${currentChannel.channel_name}? Type 'leave' to confirm`
		);

		// if 'delete' is the input, proceed to delete account
		if (confirmDelete && confirmDelete.toLowerCase().trim() === 'leave') {
			// alert to user, successful deletion
			alert(`You have left channel ${currentChannel.channel_name}`);

			if (currentChannel.id && currentUserId) {
				// call on thunk to delete current user from current channel
				dispatch(
					channelsUsersActions.thunkRemoveUserFromChannel(
						currentChannel.id,
						currentUserId
					)
				)
					.then(() => dispatch(channelsUsersActions.thunkGetAllChannelsUsers()))
					.then(() => {
						dispatch(channelActions.thunkGetUserChannels());

						setRightClickModal(false);

						return history.push(
							`/chat/channels/${channelState ? channelState[0].id : 0}`
						);
					});
			}
		}
	};

	// similarly, a function to handle delete user for DMR
	const handleDeleteDMR = async () => {
		var confirmDelete = prompt(
			`Are you sure you want to delete direct message room ${currentDMR.dmr_name}? Type 'delete' to confirm`
		);

		if (confirmDelete && confirmDelete.toLowerCase().trim() === 'delete') {
			alert(`Direct Message Room ${currentDMR.dmr_name} has been deleted`);
		}

		if (currentDMR.id) {
			dispatch(dmrActions.thunkDeleteDmr(currentDMR.id));
			dispatch(dmrActions.thunkGetAllUserDmrs());
			setRightClickModal(false);
			return history.push(`/chat/dmrs/${dmrState ? dmrState[0].id : 0}`);
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
			className={`rcm-section-${checkRouteProperlyOwned}`}
		>
			{checkRouteProperlyOwned && (
				<figure id='rcm-fig-1'>
					{/* check if owner of channel */}
					<p
						onClick={(_) => {
							setCreateChannelOpenModal(true);
							setEditChannel(true);
							setRightClickModal(false);
						}}
					>
						Edit chat
					</p>
				</figure>
			)}
			<figure id='rcm-fig-2'>
				{checkRouteProperlyOwned ? (
					<p onClick={handleDeleteChannel}>Delete channel</p>
				) : (
					<p onClick={handleLeaveChannel}>Leave chat</p>
				)}
			</figure>
		</section>
	);
};

// export component
export default RightClickModal;
