// src/components/MessagePage/MessageDisplay/ShowMembersModal/ShowMembersModal.js

// import css
import './ShowMembersModal.css'

// import context
import { useChannel } from '../../../../context/ChannelContext';
import { useParams } from 'react-router-dom';

// import react
import { useEffect, useState } from 'react';

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
	const userState = useSelector(state => state.users? state.users: state);
	const [users, setUsers] = useState([]);
	const [chatUsers, setChatUsers] = useState([]);

	console.log(userState);

	let chatId = window.location.pathname.split('/')[2] === 'channels'? Number(channelId): Number(dmrId);
	// let chatUsers = [];

	// console.log(chatUsers)

	useEffect(() => {
		if(window.location.pathname.split('/')[2] === 'channels'){
			channelsUsers.forEach( (users) => {
				users.forEach(user => {
					if(user.channel_id === chatId){
						chatUsers.push(user.user_id)
					}
				})
			});
		}else{
			dmrUsers.forEach( (users) => {
				users.forEach(user => {
					if(user.dmr_id === chatId){
						chatUsers.push(user.user_id)
					}
				})
			});
		}


		setUsers(Object.values(userState).filter( user => {
			if(chatUsers.includes(user.id)){
				console.log('user', user)
				return user
			}
			 
			}))
		console.log(chatUsers)
	}, [userState, chatId])
	
	useEffect(() => {
		console.log(users)

	}, [users])

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
