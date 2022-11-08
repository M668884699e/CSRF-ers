// import css
import './LeftBar.css';

// import component
import AlwaysScrollToBottom from '../MessageDisplay/AlwaysScrollToBottom';
import CreateChannelModal from './CreateChannelModal';
import CreateDMRModal from './CreateDMRModal';
import AddPeopleModal from './AddPeopleModal';
import RightClickModal from './RightClickModal';

// import context
import { useChannel } from '../../../context/ChannelContext';
import { useChannelsUsers } from '../../../context/ChannelsUsersContext';
import { useMessage } from '../../../context/MessageContext';
import { useDMR } from '../../../context/DMRContext';
import { useDMRUsers } from '../../../context/DMRUsersContext';
import { Modal } from '../../../context/Modal';

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
import * as messageActions from '../../../store/message';

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
	const allUsers = useSelector(userActions.getAllUsers);

	// load channels
	useEffect(() => {
		dispatch(channelActions.thunkGetUserChannels()).catch(() => {});
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
			let currentDMRDetail = [];

			if (Array.isArray(dmrUsers)) {
				dmrUsers.forEach((el) => {
					if (currentUserId === el.user_id) {
						currentDMRDetail.push(el.dmr_id);
					}
				});
			}
			let dmrDisplay = [];
			dmrState.forEach((el) => {
				if (currentDMRDetail.includes(el.id)) {
					dmrDisplay.push(el);
				}
			});

			if (dmrDisplay) {
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

	const setChannelPrivacy = (channel) => {
		if (channel.public) {
			return true;
		} else {
			return false;
		}
	};

	const loadAllChannels = () => {
		const channelsArray = Object.values(channels);
		let privacy = false;

		return (
			Array.isArray(channelsArray) &&
			channelsArray.map((channel, i) => {
				return (
					<section
						onClick={(e) => {
							e.stopPropagation();
							e.preventDefault();
							setRouteType('channels');

							dispatch(messageActions.thunkGetChannelMessages(channel.id));
							return history.push(`/chat/channels/${channel.id}`);
						}}
						onContextMenu={(e) => {
							// prevent default right click
							e.preventDefault();
							setRouteType('channels');
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
							{setChannelPrivacy(channel) ? (
								<i className='fa-regular fa-hashtag' />
							) : (
								<i id='lock-test' className='fa-solid fa-lock lock-test'></i>
							)}
						</aside>
						{
							<>
								<>{channel.channel_name.slice(0, 20)}</>

								<>{channel.channel_name.length > 20 ? '...' : ''}</>
							</>
						}
					</section>
				);
			})
		);
	};

	const loadDMRProfilePicture = (dmr) => {
		return (
			<figure id='dmr-profile-pic'>
				<i className='fa-brands fa-slack'></i>
			</figure>
		);
	};

	const loadAllDMRs = () => {
		const dmrsArray = Object.values(dmrs);

		return (
			Array.isArray(dmrsArray) &&
			dmrsArray.map((dmr, i) => {
				let dmrName = dmr.dmr_name.indexOf(',');
				return (
					<section
						onClick={(e) => {
							e.stopPropagation();
							e.preventDefault();
							setRouteType('dmr');

							dispatch(messageActions.thunkGetChannelMessages(dmr.id, 'dmr'));
							return history.push(`/chat/dmr/${dmr.id}`);
						}}
						onContextMenu={(e) => {
							// prevent default right click
							e.preventDefault();
							setRouteType('dmr');
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
						<aside>{loadDMRProfilePicture(dmr)}</aside>
						<aside>
							{
								<>
									<>{dmr.dmr_name.slice(dmrName + 1)}</>

									<>{dmr.dmr_name.length > 20 ? '...' : ''}</>
								</>
							}
						</aside>
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
								<aside>
									<span>Create A Channel</span>
								</aside>
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
										setRouteType('dmr');
										setEditChannel(false);
										setAddPeopleModal(true);
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
					<i
						id='exit-lb-icon'
						className='fa-solid fa-right-from-bracket exit-lb-icon'
					></i>
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
