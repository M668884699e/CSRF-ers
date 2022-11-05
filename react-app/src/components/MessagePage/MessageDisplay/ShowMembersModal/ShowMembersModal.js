// src/components/MessagePage/MessageDisplay/ShowMembersModal/ShowMembersModal.js

// import css
import './ShowMembersModal.css'

// import context
import { useChannel } from '../../../../context/ChannelContext';

// import react
import { useEffect } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import store
import * as userActions from '../../../../store/users';


//? ShowMembersModal component
const ShowMembersModal = ({ setMembersModal }) => {
	// invoke dispatch
	const dispatch = useDispatch();

	// use context

	// const [userList, setUserList] = useState([]);

	// selector functions
	const userState = useSelector(state => state.users? state.users: state);
	console.log(userState);

	// get list of all members that belong
	// useEffect(() => {
	// 	window.location.pathname.split('/')[2] === 'channels'
	// 		? dispatch(
	// 				userActions.thunkGetChannelUsers(
	// 					Number(window.location.pathname.split('/')[3])
	// 				)
	// 		  )
	// 		: dispatch(
	// 				userActions.thunkGetDMRUsers(Number(window.location.pathname.split('/')[3]))
	// 		  );
	// }, [dispatch]);

	// console.log(userState);

	// useEffect(() => {
	// 	//! TODO
	// }, [userState]);
	// console.log('In the members modal.')

	let users = 	window.location.pathname.split('/')[2] === 'channels'
			? dispatch(
					userActions.thunkGetChannelUsers(
						window.location.pathname.split('/')[3]
					)
			  )
			: dispatch(
					userActions.thunkGetDMRUsers(window.location.pathname.split('/')[3])
			  );

			  console.log(users);

	return (
		<section id='smm-container'>
			<h2>Members</h2>
			{/* Get channel name */}
			<ul id='smm-members-ul'>

			</ul>
		</section>
		);
};

// export component
export default ShowMembersModal;
