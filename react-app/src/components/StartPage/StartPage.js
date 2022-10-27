// src/components/StartPage/StartPage.js

// import component
import LeftSlider from './LeftSlider';
import MainStartSetup from './MainStartSetup';

// import css
import './StartPage.css';

//? StartPage component
const StartPage = () => {
  return (
    <section id="sp-section">
      <nav id="sp-section-top"/>
      <section id="sp-section-inner">
        {/* Left Slider Component */}
        <LeftSlider />

        {/* Main Set Up Component */}
        <MainStartSetup/>
      </section>
    </section>
  );
};

// export StartPage
export default StartPage;
