// src/components/MessagePage/ProfileBar/ProfileBar.js

// import component
import EditProfileModal from './EditProfileModal/EditProfileModal.js';

// import context
import { useProfile } from '../../../context/ProfileContext.js';
import { Modal } from '../../../context/Modal.js';

// import react
import { useState } from 'react';

// import css
import "./ProfileBar.css"

// import react-redux
import { useSelector } from "react-redux"

// import store
import * as sessionActions from '../../../store/session';

const ProfileBar = () => {
    // get current user information
    const profilePicture = useSelector(sessionActions.getUserProfilePicture)
    const firstName = useSelector(sessionActions.getUserFirstName);
    const lastName = useSelector(sessionActions.getUserLastName);
    const username = useSelector(sessionActions.getUserDisplayName);
    const emailAddress = useSelector(sessionActions.getUserEmail);

    /**
     * Controlled Input
     */
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    

    // use context
    const { profileBarActive, setProfileBarActive } = useProfile();
    
    // get current time
    const currentTime = () => {
        let currDate = new Date();
        let H = currDate.getHours();
        let m = currDate.getMinutes();
        let amPm = "AM";

        // change to appropriate time format 
        if(currDate.getHours() >= 12) amPm = "PM"
        if (H < 10) H = "0" + H;
        if (H > 12) H = H - 12;
        if (m < 10) m = "0" + m;
        
        if (document.getElementById("profile-curr-time")) {
            document.getElementById("profile-curr-time").textContent = `${H}:${m} ${amPm} local time`
        }
    }

    // update current time
    setInterval(currentTime);

    return (
        <section id={`profile-bar-${profileBarActive}`}>
            <section id="profile-bar-header">
                <h2>
                    Profile
                    <i
                        className="fa-solid fa-x pb-x-icon fa-xs"
                        onClick={e => {
                            // prevent from clicking on parent
                            e.stopPropagation();
                            setProfileBarActive(false);
                        }}
                    />
                </h2>
            </section>
            {/* Aside Containers */}
            <section id="profile-bar-aside-container">
                {/* Aside 1 */}
                <aside id="pbac-a1">
                    {/* Aside 1 Container 1 */}
                    <figure id="pbac-a1-c1">
                        <img
                            src={profilePicture}
                            alt={username}
                        />
                    </figure>

                    {/* Aside 1 Container 2 */}
                    <section id="pbac-a1-c2">
                        <p>{firstName + " " + lastName}</p>
                        <p
                            onClick={_ => setShowEditProfileModal(true)}
                        >
                            Edit
                        </p>
                    </section>

                    {/* Aside 1 Container 3 */}
                    <section id="pbac-a1-c3">
                        <p id="pbac-a1-c3-p">
                            <i
                                id="pbac-a1-c3-p-i"
                                className="fa-regular fa-circle fa-2xs"
                            />
                            <span>Away</span>
                        </p>
                        <p id="pbac-a1-c3-p2">
                            <i className="fa-regular fa-clock fa-xs" />
                            <span id="profile-curr-time"/>
                        </p>
                    </section>
                </aside>
                {/* line break */}
                <span id="pbac-lb"/>

                {/* Aside 2 */}
                <aside id="pbac-a2">
                    {/* Aside 2 Container 1 */}
                    <section id="pbac-a2-c1">
                        <p>Contact Information</p>
                        <p
                            onClick={_ => setShowEditProfileModal(true)}
                        >
                            Edit
                        </p>
                    </section>

                    {/* Aside 2 Container 2 */}
                    <section id="pbac-a2-c2">
                        <figure>
                            <i className="fa-regular fa-envelope"/>
                        </figure>
                        <p id="pbac-a2-c2-p">
                            Email Address
                            <span>{emailAddress}</span>
                        </p>
                    </section>

                    {/* Aside 2 Container 3 */}
                    <section id="pbac-a2-c3">
                        <figure>
                            <i className="fa-solid fa-user"/>
                        </figure>
                        <p id="pbac-a2-c3-p">
                            Display Name
                            <span>{username}</span>
                        </p>
                    </section>
                </aside>
            </section>
            {
                showEditProfileModal
                &&
                <Modal onClose={_ => setShowEditProfileModal(false)} currentVisible={false}>
                        <EditProfileModal setShowEditProfileModal={setShowEditProfileModal} />
                </Modal>
            }
        </section>
    )
}

export default ProfileBar
