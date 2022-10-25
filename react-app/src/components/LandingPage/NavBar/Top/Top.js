// src/components/LandingPage/NavBar/Top/Top.js

// import component
import LeftNavBar from "../LeftNavBar";
import RightNavBar from "../RightNavBar";

// import css
import "./Top.css";

//? Top component
const Top = () => {
  return (
    <section id="tnb-container">
      {/* LeftNavBar */}
      <LeftNavBar />
      
      {/* RightNavBar */}
      <RightNavBar />
    </section>
  )
}

export default Top;
