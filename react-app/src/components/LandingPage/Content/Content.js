// src/components/LandingPage/Content/Content.js

// import css
import './Content.css';

// import component
import ContactUsContent from './ContactUsContent';
import PartnerContent from './PartnerContent';

//? Content component
const Content = () => {
  
  return (
    <section id="content-container">
      {/* Contact Us Aside */}
      <ContactUsContent />
      
      {/* Partner Aside */}
      <PartnerContent/>
    </section>
  )
}

export default Content;
