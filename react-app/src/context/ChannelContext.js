// src/components/context/ChannelContext.js
import { useState, useContext, createContext, useEffect } from 'react';

// set up context
export const ChannelContext = createContext();
export const useChannel = () => useContext(ChannelContext);

// create provider for channel
export default function ChannelProvider({ children }) {
	// state for context
	const [channels, setChannels] = useState({});

	// Channel Provider
	return (
		<>
			<ChannelContext.Provider
				value={{
					channels,
					setChannels
				}}
			>
				{children}
			</ChannelContext.Provider>
		</>
	);
}
