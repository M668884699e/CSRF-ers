// src/components/context/StarterContext.js
import { useState, useContext, createContext, useEffect } from 'react';

// set up context
export const UserContext = createContext();
export const useUsers = () => useContext(UserContext);

// create provider for user provider
export default function UserProvider({ children }) {
  // state for context
  const [users, setUsers] = useState([]);

  // User Provider
  return (
    <>
      <UserContext.Provider
        value={{
          users, setUsers
        }}
      >
        {children}
      </UserContext.Provider>
    </>
  )
}
