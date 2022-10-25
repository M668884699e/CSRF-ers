// src/components/LandingPage/Gallery/Gallery.js

// import css
import './Gallery.css';
import GalleryMain from './GalleryMain';
import Header from './Header';

//? Gallery component
const Gallery = () => {
  // if logged in
  
  return (
    <section id="gallery-container">
      {/* Header Component */}
      <Header/>

      {/* GalleryMain Component */}
      <GalleryMain/>
    </section>
  )
}

// export component
export default Gallery;
