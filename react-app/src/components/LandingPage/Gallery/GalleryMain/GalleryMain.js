// src/components/LandingPage/Gallery/GalleryMain/GalleryMain.js

// import context
import { useChannel } from '../../../../context/ChannelContext';
import { useLanding } from '../../../../context/LandingContext';
import { useChannelsUsers } from '../../../../context/ChannelsUsersContext';

// import css
import './GalleryMain.css';

// import react
import { useEffect } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import react-router-dom
import { NavLink } from 'react-router-dom';

// import store
import * as channelActions from '../../../../store/channel';
import * as sessionActions from '../../../../store/session';
import * as channelsUsersActions from '../../../../store/channels-users';
import * as userActions from '../../../../store/users';
import * as messageActions from '../../../../store/message';
import { useMessage } from '../../../../context/MessageContext';
//? Main component
const GalleryMain = () => {
	/**
	 * Controlled Inputs:
	 */
	const { channels, setChannels } = useChannel();
	const { channelsUsers, setChannelsUsers } = useChannelsUsers();
	const { mainOpen, setMainOpen } = useLanding();
	const { routeType, setRouteType } = useMessage();
	// const { onLoad, setOnLoad } =

	// invoke dispatch
	const dispatch = useDispatch();

	const usersState = useSelector(userActions.getAllUsers);
	const channelsUsersState = useSelector(
		channelsUsersActions.getAllUsersChannels
	);
	const channelState = useSelector(channelActions.getAllChannels);
	const userEmail = useSelector(sessionActions.getUserEmail);
	const currentUserId = useSelector(sessionActions.getCurrentUserId);

	// load channels
	useEffect(() => {
		dispatch(channelActions.thunkGetUserChannels());
		dispatch(channelsUsersActions.thunkGetAllChannelsUsers());
		dispatch(userActions.thunkGetAllUsers());
	}, [dispatch]);

	// per channelState, currentUserId, channelsUsersState
	useEffect(() => {
		setChannelsUsers(channelsUsersState);
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
	}, [channelState, currentUserId, channelsUsersState]);

	return (
		Array.isArray(channels) && (
			<section id='gm-container'>
				<figure id='gm-figure-1' className={`gm-figure-1-${mainOpen}`}>
					<summary>
						{/* Workspaces for user-email */}
						<h2>Workspaces for {userEmail}</h2>
					</summary>
					<main>
						{/* Workspace */}
						{channels.length > 0 ? (
							<ul id='gm-figure-1-ul' className={`gm-figure-1-ul-${mainOpen}`}>
								{channels.length === 1 ? (
									<>
										<li className='workspace-li'>
											<section className='workspace-li-s1'>
												<figure className='workspace-li-figure'>
													<img
														src={channels[0].channel_image}
														alt={channels[0].channel_name}
														className='workspace-li-figure-img'
													/>
												</figure>
												<figure className='workspace-li-figure2'>
													<p id='wlf2-p1'>{channels[0].channel_name}</p>
													<section className='wlf2-section'>
														<figure className='wlf2-section-figure'>
															{channelsUsers.map((user, index) => {
																const currentUser = Object.values(
																	usersState
																).find(
																	(userState) => userState.id === user.user_id
																);

																// filter channel users with channel_id that belong to current channel
																return (
																	currentUser &&
																	index < 4 && (
																		<figure
																			className='channel-user-img-container'
																			key={currentUser.id}
																		>
																			<img
																				className='channel-user-img'
																				src={currentUser.profile_image}
																				alt={currentUser.display_name}
																			/>
																		</figure>
																	)
																);
															})}
														</figure>
														<p id='wlf2-p2'>
															{/* query for members count */}
															{channelsUsers &&
																channelsUsers.length > 0 &&
																channelsUsers.filter(
																	(channelUsers) =>
																		channels[0].id === channelUsers.channel_id
																).length}
															<span>members</span>
														</p>
													</section>
												</figure>
											</section>
											<section className='workspace-li-s2'>
												<NavLink to={`/chat/channels/${channels[0].id}`}>
													<button className='workspace-li-s2-button'>
														Launch Slack
													</button>
												</NavLink>
											</section>
										</li>
										<li className='workspace-li-2'>
											<NavLink to='/start/setup'>
												<button id='gm-cw-button'>
													Create A New Workspace
												</button>
											</NavLink>
										</li>
									</>
								) : (
									channels.map(
										(channel, index) =>
											(mainOpen ? index <= 100 : index <= 1) && (
												<li key={index} className='workspace-li'>
													<section className='workspace-li-s1'>
														<figure className='workspace-li-figure'>
															<img
																src={channel.channel_image}
																alt={channel.channel_name}
																className='workspace-li-figure-img'
															/>
														</figure>
														<figure className='workspace-li-figure2'>
															<p id='wlf2-p1'>{channel.channel_name}</p>
															<section className='wlf2-section'>
																<figure className='wlf2-section-figure'>
																	{Array.isArray(channelsUsers) &&
																		channelsUsers
																			.filter(
																				(cu) => cu.channel_id === channel.id
																			)
																			.map((user, index) => {
																				const currentUser = Object.values(
																					usersState
																				).find(
																					(userState) =>
																						userState.id === user.user_id
																				);

																				// filter channel users with channel_id that belong to current channel
																				return (
																					currentUser &&
																					index < 4 && (
																						<figure
																							className='channel-user-img-container'
																							key={currentUser.id}
																						>
																							<img
																								className='channel-user-img'
																								src={currentUser.profile_image}
																								alt={currentUser.display_name}
																							/>
																						</figure>
																					)
																				);
																			})}
																</figure>
																<p id='wlf2-p2'>
																	{/* query for members count */}
																	{Array.isArray(channelsUsers) &&
																		channelsUsers.length > 0 &&
																		channelsUsers.filter(
																			(channelUsers) =>
																				channel.id === channelUsers.channel_id
																		).length}
																	<span>members</span>
																</p>
															</section>
														</figure>
													</section>
													<section className='workspace-li-s2'>
														<NavLink to={`/chat/channels/${channel.id}`}>
															<button
																onClick={(_) => {
																	setRouteType('channels');
																	dispatch(
																		messageActions.thunkGetChannelMessages(
																			channel.id
																		)
																	);
																}}
																className='workspace-li-s2-button'
															>
																Launch Slack
															</button>
														</NavLink>
													</section>
												</li>
											)
									)
								)}
							</ul>
						) : (
							<section id='gm-cw-button-section'>
								<p>No channels currently available.</p>
								<NavLink to='/start/setup'>
									<button id='gm-cw-button'>Create A New Workspace</button>
								</NavLink>
							</section>
						)}
					</main>
					{channels.length > 0 && (
						<footer>
							<button
								onClick={(e) => {
									//* toggle mainOpen
									// if main open is off (false), get gm-container otherwise get gm-container-on
									setMainOpen(!mainOpen);
								}}
							>
								{channels.length > 2 &&
									(mainOpen ? (
										<>
											Show fewer workspaces
											<i className='fa-solid fa-angle-up'></i>
										</>
									) : (
										<>
											Show more workspaces
											<i className='fa-solid fa-angle-down'></i>
										</>
									))}
							</button>
						</footer>
					)}
				</figure>
			</section>
		)
	);
};

// export component
export default GalleryMain;
