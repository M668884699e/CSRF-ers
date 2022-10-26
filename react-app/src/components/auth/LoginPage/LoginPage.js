// src/components/auth/LoginPage/LoginForm.js

// import component
import LoginForm from "./LoginForm";

// import css
import './LoginPage.css';

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
        <h1>
          Sign into <span>Slackers</span>
        </h1>

        {/* Sub Title */}
        <h2>
          {window.location.host}
        </h2>

        {/* Login Form component */}
        <LoginForm />
      </section>
    </section>
  );
};

export default LoginPage;
