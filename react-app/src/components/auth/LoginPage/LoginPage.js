// src/components/auth/LoginPage/LoginForm.js

// import component
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";
import Footer from "../../LandingPage/Footer/Footer";

// import css
import './LoginPage.css';
import { NavLink } from "react-router-dom";

//? Login Page component
const LoginPage = () => {
  return (
    <section id="lp-section">
      {/* Top Login Page Section */}
      <section id='lp-top-section'>
      </section>

      {/* Header Login Page Section */}
      <section id="lp-header-section">
        {/* Header */}
        <header>
          {/* Slackers Logo */}
          <figure className='slackers-with-text login'>
            <img src="https://res.cloudinary.com/dfz7bzhoi/image/upload/v1674185261/CSRF-ers/Logo_w_text_black_b3kuq3.png" id="nav-logo" alt="slackers-logo" />
          </figure>
        </header>
      </section>

      {/* Main Login Page Section */}
      <section id="lp-main-section">

        {/* Title */}
        {
          window.location.pathname === "/login" ?
            <h1>
              Sign into <span>Slackers</span>
            </h1>
            :
            <h1>
              Register a <span>Slackers</span> account
            </h1>
        }

        {/* Sub Title */}
        {
          window.location.pathname === "/login" ?
            <h2>{window.location.host}</h2>
            :
            <h2>We suggest using the <span>email address you use at work</span></h2>
        }

        {/* Login Form component */}
        {
          window.location.pathname === "/login" ?
            // if path is login, open login form component
            <LoginForm />
            :
            // else open signup form
            <SignUpForm />
        }
      </section>

      <section id="lower-footer-container" className="log-in">
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
    </section>
  );
};

export default LoginPage;
