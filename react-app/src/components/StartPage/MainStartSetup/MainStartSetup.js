// src/components/StartPage/MainStartSetup/MainStartSetup.js

// import context
import { useStarter } from '../../../context/StarterContext';

//import css
import './MainStartSetup.css';

// import component
import ChannelStarterForm from './ChannelStarterForm';

//? Main Start Setup Component
const MainStartSetup = () => {
  const { starterForm, setStarterForm } = useStarter(); 
  return (
    <section id="sp-main-section">
      {/* Start off with Channel Starter Form */}
      {starterForm}
    </section>
  );
};



// export component
export default MainStartSetup;
