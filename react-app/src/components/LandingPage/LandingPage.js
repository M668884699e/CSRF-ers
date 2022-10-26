// src/components/LandingPage/LandingPage.js

// import component
import NavBar from './NavBar'
import Content from './Content'
import Gallery from './Gallery'
import Footer from './Footer'

// import css
import './LandingPage.css';

// import context
import { LandingContext } from '../../context/LandingContext';

// import react
import { useContext, useEffect } from 'react';

//? LandingPage Component
const LandingPage = ({ loaded }) => {
  const {mainOpen, setMainOpen} = useContext(LandingContext);

  return (
    <section id="landing-page-container" className={`landing-page-container-${mainOpen}`}>
      {/* //? NavBar Component */}
      <NavBar/>

      {/* //? Gallery Component */}
      <Gallery/>
      
      {/* //? Content Component */}
      <Content/>
      
      {/* //? Footer Component */}
      <Footer/>
    </section>
  )
}

export default LandingPage
