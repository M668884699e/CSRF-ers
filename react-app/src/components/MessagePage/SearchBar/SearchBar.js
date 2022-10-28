// src/components/MessagePage/SearchBar/SearchBar.js

// import css
import "./SearchBar.css"

// import react-redux
import { useSelector } from "react-redux"

// import component
import RightSearchBar from "./RightSearchBar";

//? Search Bar Component
const SearchBar = () => {
    return (
        <header id="search-bar-main">
            <section id="left-bar-section">
                <section id="left-section">

                </section>
            </section>
            <section id="center-bar-section">
                {/* Todo: get clock font via slack and implement a channel history check: priority low */}
                <button id="clock-button">
                    <i className="fa-regular fa-clock clock-button-icon fa-xl"/>
                </button>
                {/* Todo: get search button functional with req.query 'ilike' or 'like' */}
                <section id="search-bar">
                    <input id="search-text" placeholder="Search App Academy"/>
                    <section id="search-buttons">
                        <i className="fa-solid fa-sliders search-buttons-slider-icon"/>
                        <i className="fa-solid fa-magnifying-glass search-buttons-mg-icon"/>
                    </section>
                </section>
            </section>

            {/* Right Bar Section component */}
            <RightSearchBar/>
        </header>
    )
}

// export component
export default SearchBar
