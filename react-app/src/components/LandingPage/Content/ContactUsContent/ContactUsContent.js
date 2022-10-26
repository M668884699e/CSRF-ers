// src/components/LandingPage/Content/ContactUsContent/ContactUsContent.js

// import context
import { LandingContext } from '../../../../context/LandingContext';

// import react
import { useContext } from 'react';

// import react-router-dom
import { NavLink } from 'react-router-dom';

// import css
import './ContactUsContent.css';

//? ContactUsContent component
const ContactUsContent = () => {
  
  const { mainOpen, setMainOpen } = useContext(LandingContext);
  
  return (
    <aside id="cuc-aside" className={`cuc-aside-${mainOpen}`}>
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
          CSRF-ers: Slackers
        </span>
        <h2>
          Get more out of slack
        </h2>  
        <p>
          Work moves faster with unlimited messages in search, external partners in channels and more
        </p>
        {/* // TODO: to insert path to contact page */}
        <NavLink
          to="/"
          id="cuc-aside-r-a"
          onClick={_ => {
            return window.open('https://github.com/pchawin40/CSRF-ers/', '_blank')
          }}
        >
          Visit our Github →
        </NavLink>
      </aside>
    </aside>
  )
}

export default ContactUsContent;
