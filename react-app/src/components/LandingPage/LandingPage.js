// src/components/LandingPage/LandingPage.js
import React from 'react';

// import component
import NavBar from './NavBar'
import Content from './Content'
import Gallery from './Gallery'
import Footer from './Footer'

// import css
import './LandingPage.css';

//? LandingPage Component
const LandingPage = ({ loaded }) => {
  return (
    <section id="landing-page-container">
      {/* //? NavBar Component */}
      <NavBar/>

      {/* //? Content Component */}
      <Content/>
      
      {/* //? Gallery Component */}
      <Gallery/>
      
      {/* //? Footer Component */}
      <Footer/>
    </section>
  )
}

export default LandingPage
