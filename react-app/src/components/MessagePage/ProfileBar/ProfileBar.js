// import css
import "./ProfileBar.css"

// import react-redux
import { useSelector } from "react-redux"

// import store
import * as sessionActions from '../../..//store/session';

const ProfileBar = () => {
    // get current user profile image
    const profilePicture = useSelector(sessionActions.getUserProfilePicture)
    const firstName = useSelector(sessionActions.getUserFirstName);
    const lastName = useSelector(sessionActions.getUserLastName);
    const username = useSelector(sessionActions.getUserDisplayName);

    console.log("profilePicture", profilePicture);

    return (
        <section id="profile-bar">
            <section id="profile-bar-header">
                <h2>
                    Profile
                </h2>
            </section>
            <section id="profile-bar-aside-container">
                <aside id="pbac-a1">
                    <figure id="pbac-a1-c1">
                        <img
                            src={profilePicture}
                            alt={username}
                        />
                    </figure>
                    <section id="pbac-a1-c2">
                        <p>{firstName + " " + lastName}</p>
                    </section>
                </aside>
                <aside id="pbac-a2">
                    Section 3
                </aside>
                <aside id="pbac-a3">
                    Section 4
                </aside>
            </section>
        </section>
    )
}

export default ProfileBar
