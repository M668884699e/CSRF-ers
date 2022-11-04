// src/components/MessagePage/MessageDisplay/ShowMembersModal/ShowMembersModal.js

// import context
import { useChannel } from '../../../../context/ChannelContext';

// import react
import { useEffect, useSelector } from 'react';

// import react-redux
import { useDispatch } from 'react-redux';

// import store
import * as userActions from '../../../../store/users';

//? ShowMembersModal component
const ShowMembersModal = ({ setShowMembersModal }) => {
	// invoke dispatch
	const dispatch = useDispatch();

	// use context

	// selector functions
	const userState = useSelector(userActions.getAllUsers);

	// get list of all members that belong
	useEffect(() => {
		window.location.pathname.split('/')[2] === 'channels'
			? dispatch(
					userActions.thunkGetChannelUsers(
						window.location.pathname.split('/')[3]
					)
			  )
			: dispatch(
					userActions.thunkGetDMRUsers(window.location.pathname.split('/')[3])
			  );
	}, [dispatch]);

	useEffect(() => {
		//! TODO
	}, [userState]);

	return <>Testing</>;
};

// export component
export default ShowMembersModal;
