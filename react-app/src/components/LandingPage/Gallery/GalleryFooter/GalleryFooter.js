// src/components/LandingPage/Gallery/GalleryFooter/GalleryFooter.js

// import css
import './GalleryFooter.css';

// import react-router-dom
import { NavLink } from 'react-router-dom';

// import react-redux
import { useDispatch } from 'react-redux';

// import store
import { logout } from '../../../../store/session';

//? GalleryFooter component
const GalleryFooter = () => {

  // invoke dispatch
  const dispatch = useDispatch();
  
  //? function for logging out current user
  const handleLogout = async e => {
    await dispatch(logout());
  }

  return (
    <section id="gf-section">
      <h2 id="gf-section-h2">
        <span id="gf-section-h2-span-1">Not seeing your workspace?</span>
        {/*! To implement sign out when click on different email */}
        <NavLink to="/" id="gf-section-h2-span-2" onClick={handleLogout}>
          Try using a different email →
        </NavLink>
      </h2>
    </section>
  );
}

export default GalleryFooter;
