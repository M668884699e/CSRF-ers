// src/components/context/ChannelContext.js
import { useState, useContext, createContext, useEffect } from 'react';

// set up context
export const ChannelContext = createContext();
export const useChannel = () => useContext(ChannelContext);

// create provider for channel
export default function ChannelProvider({ children }) {
	// state for context
	const [channels, setChannels] = useState({});
	const [privateChannel, setPrivateChannel] = useState(false);
	const [channelName, setChannelName] = useState([]);
	const [inputLength, setInputLength] = useState(0);
	const [createdChannelId, setCreatedChannelId] = useState(null);
	const [currentChannel, setCurrentChannel] = useState(null);
	const [editChannel, setEditChannel] = useState(false);

	// Channel Provider
	return (
		<>
			<ChannelContext.Provider
				value={{
					channels,
					setChannels,
					privateChannel,
					setPrivateChannel,
					channelName,
					setChannelName,
					inputLength,
					setInputLength,
					createdChannelId,
					setCreatedChannelId,
					currentChannel,
					setCurrentChannel,
					editChannel,
					setEditChannel,
				}}
			>
				{children}
			</ChannelContext.Provider>
		</>
	);
}
