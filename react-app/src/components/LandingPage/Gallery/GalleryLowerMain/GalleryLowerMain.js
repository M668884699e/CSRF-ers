// src/components/LandingPage/Gallery/GalleryLowerMain/GalleryLowerMain.js

// import react-router-dom
import { NavLink } from 'react-router-dom';

// import css
import './GalleryLowerMain.css';

//? GalleryLowerMain component
const GalleryLowerMain = () => {
  return (
    <section id="glm-section">
      <img
        src="https://a.slack-edge.com/613463e/marketing/img/homepage/bold-existing-users/create-new-workspace-module/woman-with-laptop-color-background.png"
        alt="slack-user"
        id="slack-user-img"
      />
      <h2>Want to use Slack with a different team?</h2>
      <figure id="glm-section-figure">
        <NavLink to="/" id="glm-section-nl">
          Create A New Workspace
        </NavLink>
      </figure>
    </section>
  )
};

export default GalleryLowerMain;
