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
import { NavLink, Redirect, useHistory, useParams } from 'react-router-dom';

// import store
import * as channelActions from '../../../store/channel';
import * as channelsUsersActions from '../../../store/channels-users';
import * as dmrActions from '../../../store/dmr';
import * as dmrUsersActions from '../../../store/dmr-users';
import * as sessionActions from '../../../store/session';
import * as userActions from '../../../store/users';
import { Modal } from '../../../context/Modal';
import CreateChannelModal from './CreateChannelModal';
import CreateDMRModal from './CreateDMRModal';
import AddPeopleModal from './AddPeopleModal';
import RightClickModal from './RightClickModal';

const LeftBar = () => {
	/**
	 * Controlled inputs
	 */
	const [rect, setRect] = useState(0);

	const { addPeopleModal, setAddPeopleModal } = useMessage();
	const { createChannelOpenModal, setCreateChannelOpenModal } = useMessage();
	const { createDMROpenModal, setCreateDMROpenModal } = useMessage();
	const { rightClickModal, setRightClickModal } = useMessage();
	const { routeType, setRouteType } = useMessage();

	const { channels, setChannels } = useChannel();
	const { editChannel, setEditChannel } = useChannel();
	const { currentChannelId, setCurrentChannelId } = useChannel();
	const { channelsUsers, setChannelsUsers } = useChannelsUsers();

	const { dmrs, setDMRs } = useDMR();
	const { currentDMRId, setCurrentDMRId } = useDMR();
	const { dmrUsers, setDMRUsers } = useDMRUsers();

	const { checkRouteProperlyOwned, setCheckRouteProperlyOwned } = useMessage();

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
		setChannels(channelState);

		if (channelState) {
			let currentChannelDetail = [];

			if (Array.isArray(channelsUsers)) {
				channelsUsers.forEach((el) => {
					if (currentUserId === el.user_id) {
						currentChannelDetail.push(el.channel_id);
					}
				});
			}

			let channelDisplay = [];
			channelState.forEach((el) => {
				if (currentChannelDetail.includes(el.id)) {
					channelDisplay.push(el);
				}
			});

			if (channelDisplay) {
				setChannels(channelDisplay);
			}
		}
	}, [channelState, currentChannelId]);

	// per dmrState
	useEffect(() => {
		setDMRs(dmrState);

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
	}, [dmrState, currentDMRId]);

	// per channelsUsers state
	useEffect(() => {
		setChannelsUsers(channelsUsersState);
	}, [channelsUsersState]);

	// per dmrUsers state
	useEffect(() => {
		setDMRUsers(dmrUsersState);
	}, [dmrUsersState]);

	const loadAllChannels = () => {
		const channelsArray = Object.values(channels);

		return (
			Array.isArray(channelsArray) &&
			channelsArray.map((channel, i) => {
				return (
					<section
						onClick={(e) => {
							e.stopPropagation();
							e.preventDefault();

							return history.push(`/chat/channels/${channel.id}`);
						}}
						onContextMenu={(e) => {
							// prevent default right click
							e.preventDefault();

							history.push(`/chat/channels/${channel.id}`);

							// turn modal on
							setRightClickModal(true);
							setRect(e.target.getBoundingClientRect());

							setCheckRouteProperlyOwned(channel.owner_id == currentUserId);

							return false;
						}}
						className='channel-list-option'
						key={i}
					>
						<aside>
							<i className='fa-regular fa-hashtag'></i>
						</aside>
						<aside>{channel.channel_name}</aside>
					</section>
				);
			})
		);
	};

	const loadAllDMRs = () => {
		const dmrsArray = Object.values(dmrs);

		return (
			Array.isArray(dmrsArray) &&
			dmrsArray.map((dmr, i) => {
				return (
					<section
						onClick={(e) => {
							e.stopPropagation();
							e.preventDefault();

							return history.push(`/chat/dmr/${dmr.id}`);
						}}
						onContextMenu={(e) => {
							// prevent default right click
							e.preventDefault();

							history.push(`/chat/dmr/${dmr.id}`);

							// turn modal on
							setRightClickModal(true);
							setRect(e.target.getBoundingClientRect());

							setCheckRouteProperlyOwned(false);

							return false;
						}}
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

	// function to handle log out
	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(sessionActions.logout()).then(history.push('/'));
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
								onClick={(e) => {
									e.stopPropagation();
									setRouteType('channels');
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
								<section
									className='dmr-list-option'
									onClick={(e) => {
										e.stopPropagation();
										setAddPeopleModal(true);
										setRouteType('dmrs');
									}}
								>
									<aside>
										<i className='fa-regular fa-plus'></i>
									</aside>
									<aside>New conversation</aside>
								</section>
							</section>
						</details>
					</section>
				</section>
			</section>

			<footer id='footer' onClick={handleLogout}>
				<section id='footer-name'>Leave Slackers</section>
				<section id='footer-button'>
					<i className='fa-solid fa-right-from-bracket exit-lb-icon'></i>
				</section>
			</footer>

			{/* Edit Profile Modal */}
			{rightClickModal && (
				<Modal onClose={(_) => setRightClickModal(false)}>
					<RightClickModal
						setRightClickModal={setRightClickModal}
						rect={rect}
					/>
				</Modal>
			)}
			{createChannelOpenModal && (
				<Modal
					onClose={(_) => {
						setCreateChannelOpenModal(false);
					}}
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
