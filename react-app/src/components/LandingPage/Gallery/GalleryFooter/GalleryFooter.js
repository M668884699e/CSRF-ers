// src/components/LandingPage/Gallery/GalleryFooter/GalleryFooter.js

// import react-router-dom
import { NavLink } from 'react-router-dom';

// import css
import './GalleryFooter.css';

//? GalleryFooter component
const GalleryFooter = () => {
  return (
    <section id="gf-section">
      <h2 id="gf-section-h2">
        <span id="gf-section-h2-span-1">Not seeing your workspace?</span>
        {/*! To implement sign out when click on different email */}
        <NavLink to="/" id="gf-section-h2-span-2">
          Try using a different email →
        </NavLink>
      </h2>
    </section>
  );
}

export default GalleryFooter;
