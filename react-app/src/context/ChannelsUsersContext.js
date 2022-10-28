// src/components/context/ChannelsUsersContext.js
import { useState, useContext, createContext, useEffect } from 'react';

// set up context
export const ChannelsUsersContext = createContext();
export const useChannelsUsers = () => useContext(ChannelsUsersContext);

// create provider for channel
export default function ChannelsUsersProvider({ children }) {
  // state for context
  const [ channelsUsers, setChannelsUsers ] = useState(ChannelsUsersContext);

  // Channel Provider
  return (
    <>
      <ChannelsUsersContext.Provider
        value={{
          channelsUsers, setChannelsUsers
        }}
      >
        {children}
      </ChannelsUsersContext.Provider>
    </>
  )
}
