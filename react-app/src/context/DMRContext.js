// src/components/context/DMRContext.js
import { useState, useContext, createContext, useEffect } from 'react';

// set up context
export const DMRContext = createContext();
export const useDMR = () => useContext(DMRContext);

// create provider for DMR
export default function DMRProvider({ children }) {
	// state for context
	const [dmrs, setDMRs] = useState({});

	// DMR Provider
	return (
		<>
			<DMRContext.Provider
				value={{
					dmrs,
					setDMRs
				}}
			>
				{children}
			</DMRContext.Provider>
		</>
	);
}
