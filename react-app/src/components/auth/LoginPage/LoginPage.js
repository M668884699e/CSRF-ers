// src/components/auth/LoginPage/LoginForm.js

// import component
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";

// import css
import './LoginPage.css';

//? Login Page component
const LoginPage = () => {
  console.log("window.location", window.location);
  console.log("window.location.pathname", window.location.pathname);
  return (
    <section id="lp-section">
      {/* Top Login Page Section */}
      <section id='lp-top-section'>
      </section>

      {/* Header Login Page Section */}
      <section id="lp-header-section">
        {/* Header */}
        <header>
          {/* Slack Logo */}
          <img
            src="https://1000logos.net/wp-content/uploads/2021/06/Slack-logo.png"
            alt="Slack Logo"
          />
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
            <SignUpForm/>
        }
      </section>
    </section>
  );
};

export default LoginPage;
