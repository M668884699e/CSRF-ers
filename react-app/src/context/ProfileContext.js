// src/components/context/ProfileContext.js
import { useState, useContext, createContext, useEffect } from 'react';

// set up context
export const ProfileContext = createContext();
export const useProfile = () => useContext(ProfileContext);

// create provider for profile
export default function ProfileProvider({ children }) {
  // state for context
    const [ profileBarActive, setProfileBarActive ] = useState(false);

  // Profile Provider
  return (
    <>
      <ProfileContext.Provider
        value={{
          profileBarActive, setProfileBarActive
        }}
      >
        {children}
      </ProfileContext.Provider>
    </>
  )
}
