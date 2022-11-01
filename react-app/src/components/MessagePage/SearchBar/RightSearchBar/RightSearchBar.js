// src/components/MessagePage/SearchBar/RightSearchBar/RightSearchBar.js

// import css
import './RightSearchBar.css';

// import component
import ProfileModal from './ProfileModal';

// import context
import { Modal } from '../../../../context/Modal';

// import react
import { useState } from 'react';

// import react-redux
import { useSelector } from 'react-redux';

// import react-router-dom
import { useHistory } from 'react-router-dom';

// import store
import * as sessionActions from '../../../../store/session';

//? Right Search Bar component
const RightSearchBar = () => {
	/**
	 * Controlled Inputs
	 */
	const [showProfileModal, setShowProfileModal] = useState(false);

	// invoke history
	const history = useHistory();

	// get profile image and display name
	const profileImage = useSelector(sessionActions.getUserProfilePicture);
	const displayName = useSelector(sessionActions.getUserDisplayName);

	return (
		<section id='right-bar-section'>
			<section id='right-section'>
				<button onClick={(_) => history.push('/')} id='help-button'>
					<i className='fa-solid fa-house home-button-icon fa-xl' />
				</button>
				<button
					id='rs-profile-button'
					onClick={(_) => setShowProfileModal(true)}
				>
					<img src={profileImage} alt={displayName} id='rs-profile-pic' />
					<i className='fa-regular fa-circle rs-profile-status fa-xs' />
				</button>
			</section>
			{showProfileModal && (
				// render profile modal
				<Modal onClose={(_) => setShowProfileModal(false)}>
					<ProfileModal setShowProfileModal={setShowProfileModal} />
				</Modal>
			)}
		</section>
	);
};

// export component
export default RightSearchBar;
