// src/components/LandingPage/NavBar/RightNavBar/RightNavBar.js

// import css
import './RightNavBar.css';

// import context
import { useProfile } from '../../../../context/ProfileContext';

// import react-router-dom
import { NavLink, useHistory } from 'react-router-dom';
import { Modal } from '../../../../context/Modal';
import EditProfileModal from '../../../MessagePage/ProfileBar/EditProfileModal/EditProfileModal';

//? RightNavBar component
const RightNavBar = () => {
	const { showEditProfileModal, setShowEditProfileModal } = useProfile();
	const history = useHistory()

	return (
		<section id='rnb-container'>
			{/* search icon */}
			<span
				id='rnb-user-icon-container'
				onClick={(_) => setShowEditProfileModal(true)}
			>
				<i className='fa-solid fa-circle-user rnb-user-icon fa-2xl'></i>
			</span>
			{/* Read Github Documentation */}
			<span>
				<NavLink
					to='/'
					onClick={(_) => {
						return window.open(
							'https://github.com/pchawin40/CSRF-ers/',
							'_blank'
						);
					}}
				>
					<button id='live-chat-talk-button'>Read Documentation</button>
				</NavLink>
			</span>

			{/* create a new workspace */}
			<span>
				{/* <NavLink to='/start/setup'> */}
					<button onClick={() => history.push("/start/setup")} id='create-workspace-button'>Create A New Workspace</button>
				{/* </NavLink> */}
			</span>
			{/* Edit Profile Modal */}
			{showEditProfileModal && (
				<Modal
					onClose={(_) => setShowEditProfileModal(false)}
					currentVisible={false}
				>
					<EditProfileModal setShowEditProfileModal={setShowEditProfileModal} />
				</Modal>
			)}
		</section>
	);
};

export default RightNavBar;
