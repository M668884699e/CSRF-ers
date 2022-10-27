import "./SearchBar.css"

const SearchBar = () => {
    return (
        <header id="search-bar-main">
            <section id="left-bar-section">
                <section id="left-section">
                    LEFT
                </section>
            </section>
            <section id="center-bar-section">
                <button id="clock-button">
                    C
                </button>
                <section id="search-bar">
                    <section id="search-text">
                        Search App Academy
                    </section>
                    <section id="search-buttons">
                        <button>P</button>
                        <button>S</button>
                    </section>
                </section>
            </section>
            <section id="right-bar-section">
                <section id="right-section">
                    <button id="help-button">?</button>
                    <button>PRF</button>
                </section>
            </section>
        </header>
    )
}

export default SearchBar
