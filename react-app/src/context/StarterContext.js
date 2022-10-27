// src/components/context/StarterContext.js
import { useState, useContext, createContext, useEffect } from 'react';

// import ChannelStarterForm
import ChannelStarterForm from '../components/StartPage/MainStartSetup/ChannelStarterForm';

// set up context
export const StarterContext = createContext();
export const useStarter = () => useContext(StarterContext);

// create provider for starter page page
export default function StarterProvider({ children }) {
  // state for context
  const [channelInputted, setChannelInputted] = useState(false);
  const [channelNameInputted, setChannelNameInputted] = useState("");
  const [firstActive, setFirstActive] = useState(true);
  const [secondActive, setSecondActive] = useState(false);
  const [thirdActive, setThirdActive] = useState(false);
  const [inputLength, setInputLength] = useState(0);
  const [starterForm, setStarterForm] = useState(<ChannelStarterForm/>);

  // Starter Provider
  return (
    <>
      <StarterContext.Provider
        value={{
          channelInputted, setChannelInputted,
          channelNameInputted, setChannelNameInputted,
          firstActive, setFirstActive,
          secondActive, setSecondActive,
          thirdActive, setThirdActive,
          inputLength, setInputLength,
          starterForm, setStarterForm
        }}
      >
        {children}
      </StarterContext.Provider>
    </>
  )
}
