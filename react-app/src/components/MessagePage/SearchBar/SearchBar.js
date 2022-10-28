import "./SearchBar.css"

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
                    C
                </button>
                {/* Todo: get search button functional with req.query 'ilike' or 'like' */}
                <section id="search-bar">
                    <section id="search-text">
                        Search App Academy
                    </section>
                    <section id="search-buttons">
                        <button>F</button>
                        <button>S</button>
                    </section>
                </section>
            </section>
            <section id="right-bar-section">
                <section id="right-section">
                    <button id="help-button">?</button>
                    {/* Todo: profile button: priority high */}
                    <button>PRF</button>
                </section>
            </section>
        </header>
    )
}

export default SearchBar
