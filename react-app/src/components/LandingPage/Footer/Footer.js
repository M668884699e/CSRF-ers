// src/components/LandingPage/Footer/Footer.js

// import react-router-dom
import { NavLink } from 'react-router-dom';

// import css
import './Footer.css';

//? Footer component
const Footer = () => {
  return (
    <footer id="footer-container">
      <section id="lower-footer-container">
        {/* Left Footer */}
        <section id="ll-footer">
          <figure>
            <NavLink
              to="/"
              onClick={_ => {
                return window.open('https://github.com/RuneDelamont', '_blank')
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                alt="Brian Moore's LinkedIn"
              />
            </NavLink>
            <NavLink
              to="/"
              onClick={_ => {
                return window.open('https://www.linkedin.com/in/brian-moore-2829b496/', '_blank')
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/49/49068.png"
                alt="Brian Moore's Github"
              />
            </NavLink>
          </figure>
          <p>Brian Moore</p>
        </section>
        
        {/* Middle Footer */}
        <section id="lm-footer">
          <figure>
            <NavLink
              to="/"
              onClick={_ => {
                return window.open('https://github.com/pchawin40', '_blank')
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                alt="Chawin Pathompornvivat's Github"
              />
            </NavLink>
            <NavLink
              to="/"
              onClick={_ => {
                return window.open('https://www.linkedin.com/in/chawin-pathompornvivat/', '_blank')
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/49/49068.png"
                alt="Chawin Pathompornvivat's LinkedIn"
              />
            </NavLink>
          </figure>
          <p>Chawin (Ham) Pathompornvivat</p>
        </section>
        
        {/* Right Footer */}
        <section id="lr-footer">
          <figure>
            <NavLink
              to="/"
              onClick={_ => {
                return window.open('https://github.com/irelius', '_blank')
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                alt="Ki Hong's Github"
              />
            </NavLink>
            <NavLink
              to="/"
              onClick={_ => {
                return window.open('https://www.linkedin.com/in/sbkihongbae/', '_blank')
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/49/49068.png"
                alt="Ki Hong's LinkedIn"
              />
            </NavLink>
          </figure>
          <p>Ki Hong (Samuel) Bae</p>
        </section>
      </section>
    </footer>
  )
}

export default Footer;
