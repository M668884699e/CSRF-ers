// src/components/StartPage/LeftSlider/LeftSlider.js

// import css
import './LeftSlider.css';

// import react
import { useState } from 'react';

// import react-router-dom
import { NavLink } from 'react-router-dom';

// import context
import { useStarter } from '../../../context/StarterContext';
import { useUsers } from '../../../context/UserContext';
import { useEffect } from 'react';

//? LeftSlider component
const LeftSlider = () => {
  /**
  * Controlled Inputs
  */
  const { channelInputted, setChannelInputted } = useStarter();
  const { channelNameInputted, setChannelNameInputted } = useStarter();
  const { firstActive, setFirstActive } = useStarter();
  const { secondActive, setSecondActive } = useStarter();
  const { thirdActive, setThirdActive } = useStarter();
  const { users, setUsers } = useUsers();
  const {loadedSelectUser, setLoadedSelectUser} = useUsers();
  const [selectedUsers, setSelectedUsers] = useState([]);

  const selectedMembersList = document.querySelectorAll("li[class*='spmsf-members-li-'][class$='-true']")

  // per selected members list
  useEffect(() => {
    // get selectedUsers from selectedMembers id
    const selectedMembers = Object.values(selectedMembersList).map(select => select.value);
    const userToDisplay = users.filter(user => selectedMembers.includes(user.id));
    // set selected users once loaded in
    if (userToDisplay) setSelectedUsers(userToDisplay);
  }, [loadedSelectUser]);

  useEffect(() => {
    if (channelNameInputted.length === 0) {
      setChannelInputted(false);
    }
  }, [channelNameInputted])

  return (
    <section id="sp-ls-section">
      <main id="sp-ls-section-main">
        {/* First Left Slider Figure */}
        <figure className={`sp-ls-section-main-in slsmi-${channelNameInputted.length === 0 || !channelInputted}`}>
          {
            channelInputted ?
              <p id="slsmi-true-p">
                {channelNameInputted.slice(0, 22) + (channelNameInputted.length > 23 ? "..." : "")}
              </p>
              :  
              (
                channelNameInputted.length > 0 ?
                  <figure className={`sp-ls-section-main-2in-${channelNameInputted.length > 0}`}>
                    {channelNameInputted.slice(0, 22) + (channelNameInputted.length > 23 ? "..." : "")}
                  </figure>
                  :
                  <figure className={`sp-ls-section-main-2in-${channelInputted}`} />
              )
          }
        </figure>

        {/* Second Left Slider Figure */}
        <figure className={`sp-ls-section-main-in slsmi-false`}>
            {
              secondActive &&
              <section className="splsmi-section">
                <>
                  <p>
                    Direct messages
                  </p>
                  <ul id="splsmi-ul">
                    {/* When user click on name, if selected, have it show under DM */}
                    {
                      selectedUsers.map(user => {
                        return (
                          <li key={user.id} className="splsmi-ul-li">
                            <img
                              src={user.profile_image}
                              alt={user.display_name}
                              className="splsmi-ul-img"
                            />
                            <span className="splsmi-ul-span">{user.display_name}</span>
                          </li>
                        )
                      })
                    }
                  </ul>
              </>
            </section>
            }
        </figure>
      </main>
      <footer id="sp-ls-section-footer">
        {/* Back to home page link */}
        <NavLink to="/">
          <button id="sp-ls-section-footer-button">
            <i className="fa-solid fa-arrow-right-from-bracket fa-xl"></i>
            <span>Back to homepage</span>
          </button>
        </NavLink>
      </footer>
    </section>
  );
};

// export component
export default LeftSlider;
