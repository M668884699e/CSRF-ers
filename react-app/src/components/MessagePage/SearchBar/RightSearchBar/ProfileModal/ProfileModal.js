// src/components/MessagePage/SearchBar/RightSearchBar/ProfileModal/ProfileModal.js

// import css
import './ProfileModal.css';

// import react-redux
import { useSelector } from "react-redux";

// import store
import * as sessionActions from '../../../../../store/session';
import { useState } from 'react';

//? Profile Modal component
const ProfileModal = ({ setShowProfileModal }) => {
  /**
   * Controlled inputs
   */
  const [faceSmile, setFaceSmile] = useState(<i className="fa-regular fa-face-smile"/>);

  // get current user first and last name
  const firstName = useSelector(sessionActions.getUserFirstName);
  const lastName = useSelector(sessionActions.getUserLastName);

  // get current user profile picture
  const profilePicture = useSelector(sessionActions.getUserProfilePicture);

  // get current user display name
  const displayName = useSelector(sessionActions.getUserDisplayName);

  return (
    <ul id="profile-modal-ul">
      {/* Profile Modal Head UL */}
      <section id="profile-modal-head-ul-section">
        <aside id="profile-modal-head-ul-la">
          <img
            src={profilePicture}
            alt={displayName}
            id="pmhul-img"
          />
        </aside>
        <aside id="profile-modal-head-ul-la-ra">
          <p id="pmhulr-p1">
            {`${firstName} ${lastName}`}
          </p>
          <p id="pmhulr-p2">
            <i class="fa-regular fa-circle fa-2xs"></i>
            <span>Offline</span>
          </p>
        </aside>
      </section>
      
      {/* Profile Modal Status UL */}
      <section
        id="profile-modal-status-ul-section"
        onMouseOver={_ => setFaceSmile(<p className="pmsus-fig-smile-emote">😀</p>)}
        onMouseLeave={_ => setFaceSmile(<p><i className="fa-regular fa-face-smile pmsus-fig-smile-emote"/></p>)}
      >
        <figure
          id="pmsus-fig"
        >
          <span id="pmsus-fig-s1">
            {faceSmile}
          </span>
          <span id="pmsus-fig-s2">
            Update your status
          </span>
        </figure>
      </section>
      
      {/* Profile Modal Top UL */}
      <section id="profile-modal-top-ul-section">
        <li id="pmtus-l1">
          Set yourself as <span>active</span>
        </li>
        <li id="pmtus-l2">
          Pause notifications
          <span>
            On
            <i className="fa-solid fa-chevron-right fa-2xs"/>
          </span>
        </li>
      </section>
      
      {/* Profile Modal Mid UL */}
      <section id="profile-modal-mid-ul-section">
        {/* on click of profile, close modal and open slider */}
        <li>
          Profile
        </li>
        <li>
          Preferences
        </li>
      </section>

      {/* Profile Modal Bottom UL */}
      <section id="profile-modal-bottom-ul-section">
        <li>
          Sign out of App Academy
        </li>
      </section>
    </ul>
  );
};

// export component
export default ProfileModal;
