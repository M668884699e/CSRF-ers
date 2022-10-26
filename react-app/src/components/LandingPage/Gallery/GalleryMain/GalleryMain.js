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
                  <li key={index} className="workspace-li">
                    <img
                      src={channel.channel_image}
                      alt={channel.channel_name}
                      className="workspace-li-img"
                    />
                    <figure className="">
                      <p>
                        {channel.channel_name}
                      </p>
                      <p>
                        {/* query for members count */}
                      </p>
                    </figure>
                    <button>
                      Launch Slack
                    </button>
                  </li>
                ))
              }    
          </ul>
          </main>
          <button>
            See more
            <i className="fa-regular fa-angle-down"></i>
          </button>
      </figure>
      <figure id="gm-figure-2">
        
      </figure>
    </section>
  )
}

// export component
export default GalleryMain;
