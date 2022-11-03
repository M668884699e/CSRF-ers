// src/components/MessagePage/LeftBar/RightClickModal/RightClickModal.js

// import context
import { useChannel } from '../../../../context/ChannelContext';
import { useDMR } from '../../../../context/DMRContext';
import { useMessage } from '../../../../context/MessageContext';

// import css
import './RightClickModal.css';

// import react-redux
import { useSelector, useDispatch } from 'react-redux';

// import react-redux-dom
import { useHistory, Redirect } from 'react-router-dom';

// import store
import * as channelActions from '../../../../store/channel';
import * as dmrActions from "../../../../store/dmr"
import { useEffect } from 'react';

//? RightClickModal component
const RightClickModal = ({ setRightClickModal, rect }) => {
	const { createChannelOpenModal, setCreateChannelOpenModal } = useMessage();
	const { createDMROpenModal, setCreateDMROpenModal } = useMessage();
	const { editChannel, setEditChannel } = useChannel();
	const { editDMR, setEditDMR } = useDMR();
	const { currentChannel, setCurrentChannel } = useChannel();
	const { currentDMR, setCurrentDMR } = useDMR();
	const { currentChannelId, setCurrentChannelId } = useChannel();
	const { currentDMRId, setCurrentDMRId } = useDMR();

	// selector function
	const channelState = useSelector(channelActions.getAllChannels);
	const dmrState = useSelector(dmrActions.getAllDMRs);

	// invoke dispatch
	const dispatch = useDispatch();

	// invoke history
	const history = useHistory();

	useEffect(() => {
		// nothing for now, just to update channel state

		// updating current channel id here
<<<<<<< HEAD
		if(currentDMR) setCurrentDMRId(currentDMR.id)
		if(currentChannel) setCurrentChannelId(currentChannel.id)
		console.log('currentChannelId', currentChannelId);
		console.log("currentDMRId", currentDMRId)
	}, [channelState, dmrState]);
=======
		setCurrentChannelId(currentChannel.id);
	}, [channelState, currentChannelId]);
>>>>>>> 4ada8ff0960459e843c0aae3639b1e064f24a8fe

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

	// similarly, a function to handle delete user for DMR
	const handleDeleteDMR = async () => {
		var confirmDelete = prompt(
			`Are you sure you want to delete direct message room ${currentDMR.dmr_name}? Type 'delete' to confirm`
		)

		if (confirmDelete && confirmDelete.toLowerCase().trim() === "delete") {
			alert(`Direct Message Room ${currentDMR.dmr_name} has been deleted`)
		}

		if (currentDMR.id) {
			dispatch(dmrActions.thunkDeleteDmr(currentDMR.id));
			dispatch(dmrActions.thunkGetAllUserDmrs())
			setRightClickModal(false);
			return history.push(
				`/chat/dmrs/${dmrState ? dmrState[0].id : 0}`
			)
		}
	}

	const test = () => {
		console.log("hello?")
	}

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
