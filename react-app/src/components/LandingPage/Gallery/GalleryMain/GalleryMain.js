// src/components/LandingPage/Gallery/GalleryMain/GalleryMain.js

// import context
import { useChannel } from '../../../../context/ChannelContext';
import { useLanding } from '../../../../context/LandingContext';
import { useChannelsUsers } from '../../../../context/ChannelsUsersContext';

// import css
import './GalleryMain.css';

// import react
import { useEffect } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import react-router-dom
import { NavLink } from 'react-router-dom';

// import store
import * as channelActions from '../../../../store/channel';
import * as sessionActions from '../../../../store/session';
import * as channelsUsersActions from '../../../../store/channels-users';
import * as userActions from '../../../../store/users';

//? Main component
const GalleryMain = () => {
  /** 
  * Controlled Inputs:
  */
  const { channels, setChannels } = useChannel();
  const { channelsUsers, setChannelsUsers } = useChannelsUsers();
  const {mainOpen, setMainOpen} = useLanding();

  // invoke dispatch
  const dispatch = useDispatch();

  const usersState = useSelector(userActions.getAllUsers);
  const channelsUsersState = useSelector(channelsUsersActions.getAllUsersChannels);
  const channelState = useSelector(channelActions.getAllChannels);
  const userEmail = useSelector(sessionActions.getUserEmail);

  // load channels
  useEffect(() => {
    dispatch(channelActions.thunkGetChannels());
    dispatch(channelsUsersActions.thunkGetAllChannelsUsers());
    dispatch(userActions.thunkGetAllUsers());
  }, [dispatch]);
  
  // per channelState
  useEffect(() => {
    // set channels
    setChannels(channelState);
  }, [channelState]);

  // per channelsUsers state
  useEffect(() => {
    setChannelsUsers(channelsUsersState);
  }, [channelsUsersState]);



  return (
    <section id="gm-container">
      <figure id="gm-figure-1" className={`gm-figure-1-${mainOpen}`}>
        <summary>
          {/* Workspaces for user-email */}
          <h2>              
              Workspaces for {userEmail}
          </h2>
        </summary>
        <main>
          {/* Workspace */}
          <ul id="gm-figure-1-ul" className={`gm-figure-1-ul-${mainOpen}`}>
              {
                channelState.map((channel, index) => 
                (
                  (mainOpen ?
                  index <= 100 : index <= 1) &&
                  <li key={index} className="workspace-li">
                    <section className="workspace-li-s1">
                      <figure className="workspace-li-figure">
                        <img
                          src={channel.channel_image}
                          alt={channel.channel_name}
                          className="workspace-li-figure-img"
                        />
                      </figure>
                      <figure className="workspace-li-figure2">
                        <p id="wlf2-p1">
                          {channel.channel_name}
                        </p>
                          <section className="wlf2-section">   
                            <figure className="wlf2-section-figure">
                              {
                                channelsUsers &&
                                channelsUsers.length > 0 && 
                                channelsUsers
                                  .filter(channelUsers => channel.id === channelUsers.channel_id)
                                  .map((user, index) => {
                                    const currentUser = Object.values(usersState).find(userState => userState.id === user.user_id);
                                  
                                    return (
                                      currentUser && index < 4 && 
                                      <figure
                                          className="channel-user-img-container"
                                          key={currentUser.id}
                                      >
                                        <img
                                          className="channel-user-img"
                                          src={currentUser.profile_image}
                                          alt={currentUser.display_name}
                                        />
                                      </figure>
                                    );
                                  })
                              }
                            </figure>
                            <p id="wlf2-p2">
                              {/* query for members count */}
                              {
                                channelsUsers &&
                                channelsUsers.length > 0 && 
                                channelsUsers
                                .filter(channelUsers => channel.id === channelUsers.channel_id).length
                              }
                              <span>
                                members    
                              </span>
                            </p>
                        </section>
                      </figure>
                    </section>
                    <section className="workspace-li-s2">
                      {/* BJM: Todo, convert from static page to live channel */}
                      <NavLink to="/chat">                          
                        <button className="workspace-li-s2-button">
                          Launch Slack
                        </button>
                      </NavLink>
                    </section>
                  </li>
                ))
              }    
          </ul>
        </main>
        <footer>
          <button
            onClick={e => {
              //* toggle mainOpen
              // if main open is off (false), get gm-container otherwise get gm-container-on
              setMainOpen(!mainOpen)
            }}
          >
            {
              mainOpen ? 
                <>
                  Show fewer workspaces
                  <i className="fa-solid fa-angle-up"></i>
                </>
                :
                <>
                  Show more workspaces
                  <i className="fa-solid fa-angle-down"></i>
                </>
            }
          </button>
        </footer>
      </figure>
    </section>
  )
}

// export component
export default GalleryMain;
