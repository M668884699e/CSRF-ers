// src/components/StartPage/LeftSlider/LeftSlider.js

// import css
import './LeftSlider.css';

// import react-router-dom
import { NavLink } from 'react-router-dom';

// import react
import { useContext, useState } from 'react';

// import context
import { useStarter } from '../../../context/StarterContext';

//? LeftSlider component
const LeftSlider = () => {
  /**
  * Controlled Inputs
  */
  const { channelInputted, setChannelInputted } = useStarter();
  const { channelNameInputted, setChannelNameInputted } = useStarter();
  const { firstActive, setFirstActive } = useStarter();
  const { secondActive, setSecondActive } = useStarter();
  const { thirdActive, setThirdActive } = useStarter();

  return (
    <section id="sp-ls-section">
      <main id="sp-ls-section-main">
        {/* First Left Slider Figure */}
        <figure className={`sp-ls-section-main-in slsmi-${firstActive}`}>
          {
            channelInputted ?
              <p id="slsmi-true-p">
                {channelNameInputted}
              </p>
            :  
            <figure className={`sp-ls-section-main-2in-${channelInputted}`} />
          }
        </figure>

        {/* Second Left Slider Figure */}
        <figure className={`sp-ls-section-main-in slsmi-${secondActive}`}>
        </figure>

        {/* Third Left Slider Figure */}
        <figure className={`sp-ls-section-main-in slsmi-${thirdActive}`}>
        </figure>
      </main>
      <footer id="sp-ls-section-footer">
        {/* Back to home page link */}
        <NavLink to="/">
          <button id="sp-ls-section-footer-button">
            <i className="fa-solid fa-arrow-right-from-bracket fa-xl"></i>
            <span>Back to homepage</span>
          </button>
        </NavLink>
      </footer>
    </section>
  );
};

// export component
export default LeftSlider;
