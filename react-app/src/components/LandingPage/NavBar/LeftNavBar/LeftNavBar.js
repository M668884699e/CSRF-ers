// src/components/LandingPage/NavBar/LeftNavBar/LeftNavBar.js

// import react-router-dom
import { NavLink } from 'react-router-dom';

// import css
import './LeftNavBar.css'

const LeftNavBar = () => {
  return (
    <section id="lnb-container">
      <ul id="lnb-ul">
        <li id="lnb-link-container">
          <NavLink to="/">
            <figure id="nav-logo-container">
              <img
                src="https://res.cloudinary.com/dfz7bzhoi/image/upload/v1674183359/CSRF-ers/Logo_w_text_evbrbv.png"
                id="nav-logo"
                alt="slackers-logo"
              />
            </figure>
          </NavLink>
        </li>
      </ul>
    </section>
  )
}

export default LeftNavBar;
