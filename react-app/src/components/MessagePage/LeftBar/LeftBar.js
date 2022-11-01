// import css
import './LeftBar.css';

// import context
import { useChannel } from '../../../context/ChannelContext';
import { useChannelsUsers } from '../../../context/ChannelsUsersContext';
import { useMessage } from '../../../context/MessageContext';

// import react
import { useEffect, useState } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import react-router-dom
import { NavLink, useHistory } from 'react-router-dom';

// import store
import * as channelActions from '../../../store/channel';
import * as dmrActions from '../../../store/channel';
import * as sessionActions from '../../../store/session';
import * as channelsUsersActions from '../../../store/channels-users';
import * as userActions from '../../../store/users';
import { Modal } from '../../../context/Modal';
import CreateChannelModal from './CreateChannelModal';
import AddPeopleModal from './AddPeopleModal';

const LeftBar = () => {
	/**
	 * Controlled inputs
	 */
	const { addPeopleModal, setAddPeopleModal } = useMessage();
	const { channels, setChannels } = useChannel();
	const { channelsUsers, setChannelsUsers } = useChannelsUsers();
	const { createChannelOpenModal, setCreateChannelOpenModal } = useMessage();
	useState([]);

	// invoke dispatch
	const dispatch = useDispatch();

	// invoke history
	const history = useHistory();

	const channelsUsersState = useSelector(
		channelsUsersActions.getAllUsersChannels
	);
	const channelState = useSelector(channelActions.getAllChannels);
	const currentUserId = useSelector(sessionActions.getCurrentUserId);

	// load channels
	useEffect(() => {
		dispatch(channelActions.thunkGetUserChannels());
		dispatch(channelsUsersActions.thunkGetAllChannelsUsers());
	}, [dispatch, currentUserId]);

	// per channelState
	useEffect(() => {
		setChannels(channelState);
	}, [channelState]);

	// per channelsUsers state
	useEffect(() => {
		setChannelsUsers(channelsUsersState);
	}, [channelsUsersState]);

	const loadAllChannels = () => {
		return (
			Array.isArray(channels) &&
			channels.map((channel, i) => {
				return (
					<section
						onClick={(_) => history.push(`/chat/channels/${channel.id}`)}
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

	const values = 'test';

	return (
		<aside id='left-bar-main'>
			<section id='section-one'>
				<section id='server-name'>
					<h4>Place Holder Name</h4>
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
								onClick={(_) => setCreateChannelOpenModal(true)}
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
								<section className='dmr-list-option'>
									<aside>
										<i className='fa-regular fa-hashtag'></i>
									</aside>
									<aside>DMR 1</aside>
								</section>
								<section className='dmr-list-option'>
									<aside>
										<i className='fa-regular fa-hashtag'></i>
									</aside>
									<aside>DMR 2</aside>
								</section>
								<section className='dmr-list-option'>
									<aside>
										<i className='fa-regular fa-hashtag'></i>
									</aside>
									<aside>DMR 3</aside>
								</section>
								<section className='dmr-list-option'>
									<aside>
										<i className='fa-regular fa-plus'></i>
									</aside>
									<aside>Add teammates</aside>
								</section>
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
				<Modal
					onClose={(_) => setAddPeopleModal(false)}
					currentVisible={false}>
					<AddPeopleModal setAddPeopleModal={setAddPeopleModal} />
				</Modal>
			)}
		</aside>
	);
};

export default LeftBar;
