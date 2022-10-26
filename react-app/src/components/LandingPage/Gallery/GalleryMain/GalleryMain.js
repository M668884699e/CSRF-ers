// src/components/LandingPage/Gallery/GalleryMain/GalleryMain.js

// import context
import { ChannelContext } from '../../../../context/ChannelContext';

// import css
import './GalleryMain.css';

// import react
import { useContext, useEffect } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import store
import * as channelActions from '../../../../store/channel';

//? Main component
const GalleryMain = () => {
  /** 
  * Controlled Inputs:
  */
  const {channels, setChannels} = useContext(ChannelContext);
  
  // invoke dispatch
  const dispatch = useDispatch();

  const channelState = useSelector(channelActions.getAllChannels);

  // load channels
  useEffect(() => {
    dispatch(channelActions.thunkGetChannels());
  }, [dispatch]);
  
  // per channelState
  useEffect(() => {
    // set channels
    setChannels(channelState);
  }, [channelState]);

  return (
    channelState && 
    <section id="gm-container">
      <figure id="gm-figure-1">
        <summary>
          {/* Workspaces for user-email */}
          Workspaces for email@email.com
        </summary>
        <main>
          {/* Workspace */}
          <ul>
              {
                channelState.map((channel, index) => 
                  (
                    <li key={index}>
                      {channel.channel_name}
                    </li>
                  )
                )
              }    
          </ul>
        </main>
      </figure>
      <figure id="gm-figure-2">
        
      </figure>
    </section>
  )
}

// export component
export default GalleryMain;
