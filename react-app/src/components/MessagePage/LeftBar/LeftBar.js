// import css
import './LeftBar.css';

// import context
import { useChannel } from '../../../context/ChannelContext';
import { useChannelsUsers } from '../../../context/ChannelsUsersContext';
import { useMessage } from '../../../context/MessageContext';
import { useDMR } from '../../../context/DMRContext';
import { useDMRUsers } from '../../../context/DMRUsersContext';

// import react
import { useEffect, useState } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import react-router-dom
import { NavLink, useHistory, useParams } from 'react-router-dom';

// import store
import * as channelActions from '../../../store/channel';
import * as channelsUsersActions from '../../../store/channels-users';
import * as dmrActions from '../../../store/dmr';
import * as dmrUsersActions from '../../../store/dmr-users';
import * as sessionActions from '../../../store/session';
import * as userActions from '../../../store/users';
import { Modal } from '../../../context/Modal';
import CreateChannelModal from './CreateChannelModal';
import AddPeopleModal from './AddPeopleModal';
import RightClickModal from './RightClickModal';

const LeftBar = () => {
	/**
	 * Controlled inputs
	 */
	const { addPeopleModal, setAddPeopleModal } = useMessage();
	const { createChannelOpenModal, setCreateChannelOpenModal } = useMessage();
	const { rightClickModal, setRightClickModal } = useMessage();
	const { channels, setChannels } = useChannel();
	const { channelsUsers, setChannelsUsers } = useChannelsUsers();
	const [rect, setRect] = useState(0);
	const { editChannel, setEditChannel } = useChannel();
	const { dmrs, setDMRs } = useDMR();
	const { dmrUsers, setDMRUsers } = useDMRUsers();
	const { currentChannelId, setCurrentChannelId } = useChannel();

	// invoke dispatch
	const dispatch = useDispatch();

	// invoke history
	const history = useHistory();

	const channelState = useSelector(channelActions.getAllChannels);
	const channelsUsersState = useSelector(
		channelsUsersActions.getAllUsersChannels
	);
	const dmrState = useSelector(dmrActions.getAllDMRs);
	const dmrUsersState = useSelector(dmrUsersActions.getAllUserDMRs);
	const currentUserId = useSelector(sessionActions.getCurrentUserId);

	// load channels
	useEffect(() => {
		dispatch(channelActions.thunkGetUserChannels());
		dispatch(channelsUsersActions.thunkGetAllChannelsUsers());
		dispatch(dmrActions.thunkGetAllDmrs());
		dispatch(dmrUsersActions.thunkGetAllDMRUsers());
	}, [dispatch]);

	// per channelState
	useEffect(() => {
		// filter out any duplicate

		// console.log('channelState', channelState);
		// const test = new Set(channelState);
		// console.log('test', test);

		

		setChannels(channelState);
	}, [channelState]);

	// per dmrState
	useEffect(() => {
		if (dmrState) {
			const currentDMRsUserBelongTo = Array.isArray(dmrUsers)
				? dmrUsers.filter((dmru) => currentUserId === dmru.user_id)
				: '';

			const currentDMRDetail = [];

			Array.isArray(dmrUsers) &&
				currentDMRsUserBelongTo.forEach((dmru) => {
					currentDMRDetail.push(dmru.dmr_id);
				});

			const dmrDisplay =
				Array.isArray(dmrState) &&
				dmrState.filter((dmr) => currentDMRDetail.includes(dmr.id));

			if (Array.isArray(dmrDisplay)) {
				setDMRs(dmrDisplay);
			}
		}
	}, [dmrState]);

	// per channelsUsers state
	useEffect(() => {
		setChannelsUsers(channelsUsersState);
	}, [channelsUsersState]);

	// per dmrUsers state
	useEffect(() => {
		setDMRUsers(dmrUsersState);
	}, [dmrUsersState]);

	// per channel id
	useEffect(() => {
		// nothing for now
	}, [currentChannelId]);

	const loadAllChannels = () => {
		return (
			Array.isArray(channels) &&
			channels.map((channel, i) => {
				return (
					<section
						onClick={(_) => history.push(`/chat/channels/${channel.id}`)}
						onContextMenu={(e) => {
							// prevent default right click
							e.preventDefault();

							setCurrentChannelId(channel.id);

							// turn modal on
							setRightClickModal(true);
							setRect(e.target.getBoundingClientRect());

							return false;
						}}
						className='channel-list-option'
						key={i}
					>
						<aside>
							<i className='fa-regular fa-hashtag'></i>
						</aside>
						<aside>{channel.channel_name}</aside>
						{rightClickModal && (
							<Modal onClose={(_) => setRightClickModal(false)}>
								<RightClickModal
									setRightClickModal={setRightClickModal}
									rect={rect}
								/>
							</Modal>
						)}
					</section>
				);
			})
		);
	};

	const loadAllDMRs = () => {
		return (
			Array.isArray(dmrs) &&
			dmrs.map((dmr, i) => {
				return (
					<section
						onClick={(_) => history.push(`/chat/dmrs/${dmr.id}`)}
						className='dmr-list-option'
						key={i}
					>
						<aside>
							<i className='fa-regular fa-hashtag'></i>
						</aside>
						<aside>{dmr.dmr_name}</aside>
					</section>
				);
			})
		);
	};

	return (
		<aside
			id='left-bar-main'
			onContextMenu={(e) => {
				// remove default right click menu
				e.preventDefault();

				return false;
			}}
		>
			<section id='section-one'>
				<section id='server-name'>
					<h4>Slackers</h4>
					<figure id='new-message-button'>
						<i className='fa-brands fa-slack'></i>
					</figure>
				</section>
			</section>

			<section id='section-three'>
				<section id='channel-section'>
					<details>
						<summary id='channel-header'>Channels</summary>
						<section id='channel-list'>
							{loadAllChannels()}
							<section
								className='channel-list-option'
								onClick={(_) => {
									setEditChannel(false);
									setCreateChannelOpenModal(true);
								}}
							>
								<aside>
									<i className='fa-regular fa-plus'></i>
								</aside>
								<aside>Create A Channel</aside>
							</section>
						</section>
					</details>
				</section>

				<section id='section-four'>
					<section id='dmr-section'>
						<details>
							<summary id='dmr-header'>Direct messages</summary>
							<section id='dmr-list'>
								{loadAllDMRs()}
								<aside>
									<i className='fa-regular fa-plus'></i>
								</aside>
								<aside>Add teammates</aside>
							</section>
						</details>
					</section>
				</section>
			</section>

			<footer id='footer'>
				<section id='footer-name'>Leave Slackers</section>
				<section id='footer-button'>
					<i className='fa-solid fa-right-from-bracket'></i>
				</section>
			</footer>

			{/* Edit Profile Modal */}
			{createChannelOpenModal && (
				<Modal
					onClose={(_) => setCreateChannelOpenModal(false)}
					currentVisible={false}
				>
					<CreateChannelModal
						setCreateChannelOpenModal={setCreateChannelOpenModal}
					/>
				</Modal>
			)}
			{addPeopleModal && (
				<Modal onClose={(_) => setAddPeopleModal(false)} currentVisible={false}>
					<AddPeopleModal setAddPeopleModal={setAddPeopleModal} />
				</Modal>
			)}
		</aside>
	);
};

export default LeftBar;
