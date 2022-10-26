// src/components/LandingPage/NavBar/RightNavBar/RightNavBar.js

// import css
import './RightNavBar.css';

//? RightNavBar component
const RightNavBar = () => {
  return (
    <section id="rnb-container">
      {/* search icon */}
      <span id="rnb-user-icon-container">
        <i className="fa-solid fa-circle-user rnb-user-icon fa-2xl"></i>
      </span>
      {/* talk to live chat */}
      <span>
        <button id="live-chat-talk-button">
          Talk to Sales
        </button>
      </span>

      {/* create a new workspace */}
      <span>
        <button id="create-workspace-button">
          Create A New Workspace
        </button>
      </span>
      {/*  */}
    </section>
  )
}

export default RightNavBar;
