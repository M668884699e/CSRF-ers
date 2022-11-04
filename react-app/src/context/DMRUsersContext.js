// src/components/context/DMRsUsersContext.js
import { useState, useContext, createContext, useEffect } from 'react';

// set up context
export const DMRUsersContext = createContext();
export const useDMRUsers = () => useContext(DMRUsersContext);

// create provider for DMR
export default function DMRUsersProvider({ children }) {
	// state for context
	const [dmrUsers, setDMRUsers] = useState({});

	// DMR Provider
	return (
		<>
			<DMRUsersContext.Provider
				value={{
					dmrUsers,
					setDMRUsers
				}}
			>
				{children}
			</DMRUsersContext.Provider>
		</>
	);
}
