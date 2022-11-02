// src/components/MessagePage/SearchBar/RightSearchBar/ProfileModal/ProfileModal.js

// import context
import { useProfile } from '../../../../../context/ProfileContext';

// import css
import './ProfileModal.css';

// import react-router-dom
import { useHistory } from 'react-router';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import store
import * as sessionActions from '../../../../../store/session';
import { useState } from 'react';
import { useEffect } from 'react';

//? Profile Modal component
const ProfileModal = ({ setShowProfileModal }) => {
	/**
	 * Controlled inputs
	 */
	const [faceSmile, setFaceSmile] = useState(
		<p>
			<i className='fa-regular fa-face-smile pmsus-fig-smile-emote' />
		</p>
	);
	const { profileBarActive, setProfileBarActive } = useProfile();

	// get current user first and last name
	const firstName = useSelector(sessionActions.getUserFirstName);
	const lastName = useSelector(sessionActions.getUserLastName);

	// get current user profile picture
	const profilePicture = useSelector(sessionActions.getUserProfilePicture);

	// get current user display name
	const displayName = useSelector(sessionActions.getUserDisplayName);

	// invoke dispatch
	const dispatch = useDispatch();

	// invoke history
	const history = useHistory();

	// per profileBarActive
	useEffect(() => {
		// leaving this empty for now
	}, [profileBarActive]);

	// function to handle log out
	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(sessionActions.logout()).then(history.push('/'));
	};

	return (
		<ul id='profile-modal-ul'>
			{/* Profile Modal Head UL */}
			<section id='profile-modal-head-ul-section'>
				<aside id='profile-modal-head-ul-la'>
					<img src={profilePicture} alt={displayName} id='pmhul-img' />
				</aside>
				<aside id='profile-modal-head-ul-la-ra'>
					<p id='pmhulr-p1'>{`${firstName} ${lastName}`}</p>
					<p id='pmhulr-p2'>
						<i className='fa-regular fa-circle fa-2xs'></i>
						<span>Offline</span>
					</p>
				</aside>
			</section>

			{/* Profile Modal Status UL */}
			{/* <section
				id='profile-modal-status-ul-section'
				onMouseOver={(_) =>
					setFaceSmile(<p className='pmsus-fig-smile-emote'>😀</p>)
				}
				onMouseLeave={(_) =>
					setFaceSmile(
						<p>
							<i className='fa-regular fa-face-smile pmsus-fig-smile-emote' />
						</p>
					)
				}
			>
				<figure id='pmsus-fig'>
					<span id='pmsus-fig-s1'>{faceSmile}</span>
					<span id='pmsus-fig-s2'>Update your status</span>
				</figure>
			</section> */}

			{/* Profile Modal Top UL */}
			{/* <section id='profile-modal-top-ul-section'>
				<li id='pmtus-l1'>
					Set yourself as <span>active</span>
				</li>
				<li id='pmtus-l2'>
					Pause notifications
					<span>
						On
						<i className='fa-solid fa-chevron-right fa-2xs' />
					</span>
				</li>
			</section> */}

			{/* Profile Modal Mid UL */}
			<section id='profile-modal-mid-ul-section'>
				{/* on click of profile, close modal and open slider */}
				<li
					onClick={(e) => {
						// prevent from clicking on parent
						e.stopPropagation();
						setProfileBarActive(true);
						setShowProfileModal(false);
					}}
				>
					Profile
				</li>
				<li onClick={handleLogout}>Sign out of Slackers</li>
			</section>

			{/* Profile Modal Bottom UL */}
			{/* <section id='profile-modal-bottom-ul-section'></section> */}
		</ul>
	);
};

// export component
export default ProfileModal;
