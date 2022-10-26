// src/components/LandingPage/Gallery/Gallery.js

// import css
import './Gallery.css';
import GalleryFooter from './GalleryFooter';
import GalleryLowerMain from './GalleryLowerMain';
import GalleryMain from './GalleryMain';
import Header from './Header';

//? Gallery component
const Gallery = () => {
  // if logged in
  
  return (
    <section id="gallery-container">
      {/* Header Component */}
      <Header/>

      {/* Gallery Main Component */}
      <GalleryMain />
      
      {/* Gallery Lower Main Component */}
      <GalleryLowerMain />
      
      {/* Gallery Footer */}
      <GalleryFooter/>
    </section>
  )
}

// export component
export default Gallery;
