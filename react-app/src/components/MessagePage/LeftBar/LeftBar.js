// import css
import './LeftBar.css';

// import context
import { useChannel } from '../../../context/ChannelContext';
import { useChannelsUsers } from '../../../context/ChannelsUsersContext';

// import react
import { useEffect } from 'react';

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

const LeftBar = () => {
	const { channels, setChannels } = useChannel();
	const { channelsUsers, setChannelsUsers } = useChannelsUsers();

	// invoke dispatch
	const dispatch = useDispatch();

	// invoke history
	const history = useHistory();

	const usersState = useSelector(userActions.getAllUsers);
	const channelsUsersState = useSelector(
		channelsUsersActions.getAllUsersChannels
	);
	const channelState = useSelector(channelActions.getAllChannels);
	const userEmail = useSelector(sessionActions.getUserEmail);
	const currentUserId = useSelector(sessionActions.getCurrentUserId);

	// load channels
	useEffect(() => {
		dispatch(channelActions.thunkGetChannels());
		dispatch(channelsUsersActions.thunkGetAllChannelsUsers());
		dispatch(userActions.thunkGetAllUsers());
	}, [dispatch]);

	// per channelState
	useEffect(() => {
		// set channels
		setChannels(channelState);

		if (channelState) {
			const currentChannelsUserBelongTo = Array.isArray(channelsUsers)
				? channelsUsers.filter((cu) => currentUserId === cu.user_id)
				: '';

			const currentChannelDetail = [];

			Array.isArray(channelsUsers) &&
				currentChannelsUserBelongTo.forEach((cu) => {
					currentChannelDetail.push(cu.channel_id);
				});

			const channelDisplay =
				Array.isArray(channelState) &&
				channelState.filter((channel) =>
					currentChannelDetail.includes(channel.id)
				);

			if (Array.isArray(channelDisplay)) {
				setChannels(channelDisplay);
			}
		}
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
						onClick={(_) => history.push(`/chat/${channel.id}`)}
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

	return (
		<aside id='left-bar-main'>
			<section id='section-one'>
				<section id='server-name'>
					<h4>Place Holder Name</h4>
					<button id='new-message-button'>
						<i className='fa-regular fa-pen-to-square' />
					</button>
				</section>
			</section>

			<section id='section-two'>
				<section className='section-two-options'>
					<i className='fa-regular fa-comment'></i>
					<aside>Threads</aside>
					{/* <aside className="new-notification">NEW</aside> */}
				</section>
				<section className='section-two-options'>
					<i className='fa-regular fa-comments'></i>
					<aside>Direct messages</aside>
					{/* <aside className="new-notification">NEW</aside> */}
				</section>
				<section className='section-two-options'>
					<i className='fa-regular fa-at'></i>
					<aside>Mentions & reactions</aside>
					{/* <aside className="new-notification">NEW</aside> */}
				</section>
				<section className='section-two-options'>
					<i className='fa-regular fa-paper-plane'></i>
					<aside>Drafts & sent</aside>
					{/* <aside className="new-notification">NEW</aside> */}
				</section>
				<section className='section-two-options'>
					<i className='fa-regular fa-building'></i>

					<aside>Slack Connect</aside>
					{/* <aside className="new-notification">NEW</aside> */}
				</section>
				<section className='section-two-options'>
					<i className='fa-solid fa-ellipsis-vertical'></i>
					<aside>More</aside>
					{/* <aside className="new-notification">NEW</aside> */}
				</section>
			</section>

			<section id='section-three'>
				<section id='channel-section'>
					<details>
						<summary id='channel-header'>Channels</summary>
						<section id='channel-list'>
							{loadAllChannels()}
							<section className='channel-list-option'>
								<aside>
									<i className='fa-regular fa-plus'></i>
								</aside>
								<aside>Browse Channels</aside>
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
				<section id='footer-name'>Place Holder Name</section>
				<section id='footer-button'>
					<button id='communication'>
						<i className='fa-solid fa-headphones'></i>
					</button>
				</section>
			</footer>
		</aside>
	);
};

export default LeftBar;
