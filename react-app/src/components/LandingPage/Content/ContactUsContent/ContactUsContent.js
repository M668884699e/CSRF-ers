// src/components/LandingPage/Content/ContactUsContent/ContactUsContent.js

// import react-router-dom
import { NavLink } from 'react-router-dom';

// import css
import './ContactUsContent.css';

//? ContactUsContent component
const ContactUsContent = () => {
  return (
    <aside id="cuc-aside">
      <aside id="cuc-aside-l">
        <img
          className="c-card--customer__image"
          src="https://a.slack-edge.com/4ebba/marketing/img/homepage/bold-existing-users/promos-trial-expired-or-no-paid-plan/get-more-slack-bike.png"
          alt="Illustration of a man and woman riding a tandem bicycle"
          aria-hidden=""
        />
      </aside>
      <aside id="cuc-aside-r">
        <span>
          CSRF-ers
        </span>
        <h2>
          Get more out of slack
        </h2>  
        <p>
          Work moves faster with unlimited messages in search, external partners in channels and more
        </p>
        {/* // TODO: to insert path to contact page */}
        <NavLink to="/" id="cuc-aside-r-a">
          Contact Us →
        </NavLink>
      </aside>
    </aside>
  )
}

export default ContactUsContent;
