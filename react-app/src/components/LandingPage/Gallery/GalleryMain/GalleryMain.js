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
import * as sessionActions from '../../../../store/session';

//? Main component
const GalleryMain = () => {
  /** 
  * Controlled Inputs:
  */
  const {channels, setChannels} = useContext(ChannelContext);
  
  // invoke dispatch
  const dispatch = useDispatch();

  const channelState = useSelector(channelActions.getAllChannels);
  const userEmail = useSelector(sessionActions.getUserEmail);

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
    <section id="gm-container">
      <figure id="gm-figure-1">
        <summary>
          {/* Workspaces for user-email */}
          <h2>              
              Workspaces for {userEmail}
          </h2>
        </summary>
        <main>
          {/* Workspace */}
          <ul>
              {
                channelState.map((channel, index) => 
                (
                  index <= 1 &&
                  <li key={index} className="workspace-li">
                    <section className="workspace-li-s1">
                      <figure className="workspace-li-figure">
                        <img
                          src={channel.channel_image}
                          alt={channel.channel_name}
                          className="workspace-li-figure-img"
                        />
                      </figure>
                      <figure className="">
                        <p>
                          {channel.channel_name}
                        </p>
                        <p>
                          {/* query for members count */}
                        </p>
                      </figure>
                    </section>
                    <section className="workspace-li-s2">
                      <button className="workspace-li-s2-button">
                        Launch Slack
                      </button>
                    </section>
                  </li>
                ))
              }    
          </ul>
        </main>
        <footer>
          <button>
            See more
            <i className="fa-solid fa-angle-down"></i>
          </button>
        </footer>
      </figure>
      <figure id="gm-figure-2">
        
      </figure>
    </section>
  )
}

// export component
export default GalleryMain;
