// import css
import './LeftBar.css';

// import context
import { useChannel } from '../../../context/ChannelContext';
import { useChannelsUsers } from '../../../context/ChannelsUsersContext';
import { useDMR } from "../../../context/DMRContext"
import { useDMRUsers } from "../../../context/DMRUsersContext"

// import react
import { useEffect } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import react-router-dom
import { NavLink, useHistory } from 'react-router-dom';

// import store
import * as channelActions from '../../../store/channel';
import * as channelsUsersActions from '../../../store/channels-users';
import * as dmrActions from '../../../store/dmr';
import * as dmrUsersActions from "../../../store/dmr-users"
import * as sessionActions from '../../../store/session';
import * as userActions from '../../../store/users';

const LeftBar = () => {
	const { channels, setChannels } = useChannel();
	const { channelsUsers, setChannelsUsers } = useChannelsUsers();
	const { dmrs, setDMRs } = useDMR();
	const { dmrUsers, setDMRUsers } = useDMRUsers();

	// invoke dispatch
	const dispatch = useDispatch();

	// invoke history
	const history = useHistory();

	const channelState = useSelector(channelActions.getAllChannels);
	const channelsUsersState = useSelector(channelsUsersActions.getAllUsersChannels);
	const dmrState = useSelector(dmrActions.getAllDMRs)
	const dmrUsersState = useSelector(dmrUsersActions.getAllUserDMRs)
	const currentUserId = useSelector(sessionActions.getCurrentUserId);

	// load channels
	useEffect(() => {
		dispatch(channelActions.thunkGetChannels());
		dispatch(channelsUsersActions.thunkGetAllChannelsUsers());
		dispatch(dmrActions.thunkGetAllDmrs());
		dispatch(dmrUsersActions.thunkGetAllDMRUsers());
	}, [dispatch]);

	// per channelState
	useEffect(() => {

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

	// per dmrState
	useEffect(() => {
		if(dmrState) {
			const currentDMRsUserBelongTo = Array.isArray(dmrUsers)
			? dmrUsers.filter((dmru) => currentUserId === dmru.user_id)
			: "";

			const currentDMRDetail = [];

			Array.isArray(dmrUsers) &&
				currentDMRsUserBelongTo.forEach((dmru) => {
					currentDMRDetail.push(dmru.dmr_id)
				})

			const dmrDisplay =
				Array.isArray(dmrState) &&
				dmrState.filter((dmr) =>
					currentDMRDetail.includes(dmr.id)
				)

			if(Array.isArray(dmrDisplay)) {
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
		setDMRUsers(dmrUsersState)
	}, [dmrUsersState])

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

	const loadAllDMRs = () => {
		return (
			Array.isArray(dmrs) &&
			dmrs.map((dmr, i) => {
				return (
					<section
						onClick={(_) => history.push(`/chat/dmrs/${dmr.id}`)}
						className="dmr-list-option"
						key={i}
					>
						<aside>
							<i className='fa-regular fa-hashtag'></i>
						</aside>
						<aside>{dmr.dmr_name}</aside>
					</section>
				)
			})
		)
	}

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
		</aside>
	);
};

export default LeftBar;
