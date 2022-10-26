// src/components/LandingPage/Content/PartnerContent/PartnerContent.js

// import css
import './PartnerContent.css';

// import react
import { useContext } from 'react';

// import context
import { LandingContext } from '../../../../context/LandingContext';

//? PartnerContent component
const PartnerContent = () => {
  
  const { mainOpen, setMainOpen } = useContext(LandingContext);
  
  return (
    <section id="pc-section" className={`pc-section-${mainOpen}`}>
      {/* Ameritrade */}
      <img
        id="pc-img-ameritrade"
        alt="Ameritrade"
        src="https://download.logo.wine/logo/TD_Ameritrade/TD_Ameritrade-Logo.wine.png"
      />
      {/* Target */}
      <img
        id="pc-img-target"
        alt="Target"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Target_Corporation_logo_%28vector%29.svg/300px-Target_Corporation_logo_%28vector%29.svg.png"
      />
      {/* Uber */}
      <img
        id="pc-img-uber"
        alt="Uber"
        src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
      />
      {/* One Medical */}
      <img
        id="pc-img-onemed"
        alt="One Medical"
        src="https://logos-download.com/wp-content/uploads/2021/01/One_Medical_Logo.png"
      />
      {/* Time */}
      <img
        id="pc-img-time"
        alt="Time"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Time_Magazine_logo.svg/1280px-Time_Magazine_logo.svg.png"
      />
      {/* Intuit */}
      <img
        id="pc-img-intuit"
        alt="Intuit"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Intuit_Logo.svg/1200px-Intuit_Logo.svg.png"
      />
      {/* Oracle */}
      <img
        id="pc-img-oracle"
        alt="Oracle"
        src="https://logos-world.net/wp-content/uploads/2020/09/Oracle-Logo.png"
      />
    </section>
  )
};

export default PartnerContent;
