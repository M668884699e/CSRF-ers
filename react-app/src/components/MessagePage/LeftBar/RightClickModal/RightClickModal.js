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
import * as dmrsUsersActions from '../../../../store/dmr-users';

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
	const allUsersDMRs = useSelector(dmrActions.getAllDMRs);
	const currentUserId = useSelector(sessionActions.getCurrentUserId);

	// invoke dispatch
	const dispatch = useDispatch();

	// invoke history
	const history = useHistory();

	useEffect(() => {
		// currentChannel does not refer to a Channel. It refers to both Channel and DMR
		if (currentChannel && currentChannel.channel_name) {
			setCurrentChannelId(currentChannel.id);
		} else if (currentChannel && currentChannel.dmr_name) {
			setCurrentDMRId(currentChannel.id);
		}
	}, [dispatch, channelState, currentChannel]);

	// useEffect(() => {
	// 	console.log('use effect')
	// 	dispatch(dmrActions.thunkGetAllUserDmrs())
	// }, [dispatch])

	// per channels
	useEffect(() => {
		// nothing for now
		// if routeType is channel, check channel via channels by id,
		// see if current channel is owned by current session user
		// otherwise, hide it
		// for dmr, just hide it
	}, [channels, checkRouteProperlyOwned, channelState]);

	// function to handle delete user for channel
	const handleDeleteChannel = async () => {
		const confirmDelete = prompt(
			`Are you sure you want to delete channel ${currentChannel.channel_name}? Type 'delete' to confirm`
		);

		// if 'delete' is the input, proceed to delete account
		if (confirmDelete && confirmDelete.toLowerCase().trim() === 'delete') {
			// alert to user, successful deletion
			alert(`Channel ${currentChannel.channel_name} has been deleted`);

			if (currentChannel.id) {
				// call on thunk to delete current user
				dispatch(channelActions.thunkDeleteChannel(currentChannel.id)).then(
					() =>
						dispatch(channelActions.thunkGetUserChannels()).then((res) => {
							setChannels(res);
							setRightClickModal(false);
							const redirectTo = Object.values(res.channels)[0];
							return history.push(
								`/chat/channels/${redirectTo ? redirectTo.id : true}`
							);
						})
				);
			}
		}
	};

	// function to handle delete user for channel
	const handleLeaveChannel = async () => {
		const confirmDelete = prompt(
			currentChannel.channel_name
				? `Are you sure you want to leave channel ${currentChannel.channel_name}? Type 'leave' to confirm`
				: `Are you sure you want to leave dmr ${currentChannel.dmr_name}? Type 'leave' to confirm`
		);

		// if 'delete' is the input, proceed to delete account
		if (confirmDelete && confirmDelete.toLowerCase().trim() === 'leave') {
			// alert to user, successful deletion
			currentChannel.channel_name
				? alert(`You have left channel ${currentChannel.channel_name}`)
				: alert(`You have left dmr ${currentChannel.dmr_name}`);

			if (currentChannel.id && currentUserId) {
				// call on thunk to delete current user from current channel
				if (currentChannel.channel_name) {
					dispatch(
						channelsUsersActions.thunkRemoveUserFromChannel(
							// currentChannel does not refer to a Channel. It refers to both Channel and DMR
							currentChannel.id,
							currentUserId
						)
					)
						.then(() =>
							dispatch(channelActions.thunkDeleteChannel(currentChannel.id))
						)
						.then(() =>
							dispatch(channelsUsersActions.thunkGetAllChannelsUsers())
						)
						.then(() => {
							dispatch(channelActions.thunkGetUserChannels());

							setRightClickModal(false);

							return history.push(`/chat`);
						});
				} else {
					// leaving a DMR, which will also delete the DMR
					// dispatch(dmrActions.thunkDeleteDmr(currentChannel.id))
					// .then(dmrActions.thunkGetAllUserDmrs())
					// .then((res) => {
					// 	console.log(res, "asdf res")
					// 	console.log(allUsersDMRs, "asdf allusersdmrs")

					// 	// setRightClickModal(false)
					// 	// const redirectTo = Object.values(res.dmrs)[0]
					// 	// return history.push(`/chat/dmr/${redirectTo ? redirectTo.id : true}`)

					// 	return history.push(`/chat/channels/1`)
					// })

					// dispatch(dmrActions.thunkDeleteDmr(currentChannel.id))
					// 	.then(() => dispatch(dmrActions.thunkGetAllUserDmrs()))
					// 	.then((res) => {
					// 		console.log(res, "please work")
					// 		setRightClickModal(false)
					// 		const redirectTo = Object.values(res.dmrs)[0]
					// 		console.log(redirectTo, "redirectTo")

					// 	})
					// 	.then(() => {
					// 	})

					dispatch(
						dmrsUsersActions.thunkRemoveUserFromDMR(
							currentChannel.id, // currentChannel does not refer to a Channel. It refers to both Channel and DMR
							currentUserId
						)
					)
						.then(() => dispatch(dmrActions.thunkGetAllDmrs()))
						.then(() => dispatch(dmrActions.thunkDeleteDmr(currentDMRId)))
						.then(() => dispatch(dmrActions.thunkGetAllDmrs()))
						.then(() => dispatch(dmrsUsersActions.thunkGetAllDMRUsers()))
						.then((res) => {
							setRightClickModal(false);

							return history.push(`/chat`);
						})
						.catch((res) => {
							console.log('res errors', res);
						});
				}
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
