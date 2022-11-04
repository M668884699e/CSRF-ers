// src/components/MessagePage/MessageDisplay/AlwaysScrollToBottom/AlwaysScrollToBottom.js

// import react
import { useEffect, useRef } from 'react';

//? AlwaysScrollToBottom component
const AlwaysScrollToBottom = () => {
	const messageRef = useRef();

	// per messageRef
	useEffect(() => messageRef.current.scrollIntoView());

	return <div ref={messageRef} />;
};

// export component
export default AlwaysScrollToBottom;
