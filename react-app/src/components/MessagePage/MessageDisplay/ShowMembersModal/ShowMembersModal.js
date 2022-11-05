// src/components/MessagePage/MessageDisplay/ShowMembersModal/ShowMembersModal.js

// import css
import './ShowMembersModal.css'

// import context
import { useChannel } from '../../../../context/ChannelContext';
import { useParams } from 'react-router-dom';

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
	const { channelId, dmrId } = useParams();
	const dmrUsers = useSelector(state => Object.values(state.dmrUsers));
	const channelsUsers = useSelector(state => Object.values(state.channelsUsers));
	// console.log(channelsUsers)

	let chatId = window.location.pathname.split('/')[2] === 'channels'? Number(channelId): Number(dmrId);
	let chatUsers = [];

	if(window.location.pathname.split('/')[2] === 'channels'){
		channelsUsers.forEach( (users) => {
			users.forEach(user => {
				if(user.channel_id === chatId){
					chatUsers.push(user)
				}
			})
		});
	}else{
		console.log('dmr here')
		dmrUsers.forEach( (users) => {
			users.forEach(user => {
				if(user.dmr_id === chatId){
					chatUsers.push(user)
				}
			})
		});
	}

	// useEffect(() => {
	// 	if(window.location.pathname.split('/')[2] === 'channels'){
	// 		chatUsers = dispatch(userActions.thunkGetChannelUsers(chatId))
	// 	}else{
	// 		chatUsers = dispatch(userActions.thunkGetDMRUsers(chatId))
	// 	}

	// }, [dispatch])
	console.log(chatUsers);

	// use context

	// const [userList, setUserList] = useState([]);

	

	// selector functions
	const userState = useSelector(state => state.users? state.users: state);
	// console.log(userState);

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

	// let users = 	window.location.pathname.split('/')[2] === 'channels'
	// 		? dispatch(
	// 				userActions.thunkGetChannelUsers(
	// 					window.location.pathname.split('/')[3]
	// 				)
	// 		  )
	// 		: dispatch(
	// 				userActions.thunkGetDMRUsers(window.location.pathname.split('/')[3])
	// 		  );

	// 		  console.log(users);

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
