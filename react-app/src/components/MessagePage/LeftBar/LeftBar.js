// import css
import "./LeftBar.css"

const LeftBar = () => {
    return (
        <aside id="left-bar-main">
            <section id="section-one">
                <section id="server-name">
                    <h4>Place Holder Name</h4>
                    <button id="new-message-button">NM</button>
                </section>
            </section>

            <section id="section-two">
                <section className="section-two-options">
                    <aside>Threads</aside>
                    <aside className="new-notification">NEW</aside>
                </section>
                <section className="section-two-options">
                    <aside>Direct messages</aside>
                    <aside className="new-notification">NEW</aside>
                </section>
                <section className="section-two-options">
                    <aside>Mentions & reactions</aside>
                    <aside className="new-notification">NEW</aside>
                </section>
                <section className="section-two-options">
                    <aside>Drafts & sent</aside>
                    <aside className="new-notification">NEW</aside>
                </section>
                <section className="section-two-options">
                    <aside>Slack Connect</aside>
                    <aside className="new-notification">NEW</aside>
                </section>
                <section className="section-two-options">
                    <aside>More</aside>
                    <aside className="new-notification">NEW</aside>
                </section>
            </section>

            <section id="section-three">
                <section id="channel-section">
                    <p id="channel-header">Channels</p>
                    {/* for loop here to list current user's channels */}
                    <ul id="channel-list">
                        <li>Channel 1</li>
                        <li>Channel 2</li>
                        <li>Channel 3</li>
                    </ul>
                    <section>
                        Browse channels
                    </section>
                </section>
            </section>

            <section id="section-four">
                <section id="dmr-section">
                    <p id="dmr-header">Direct messages</p>
                    {/* for loop here to list current user's dmrs */}
                    <ul id="dmr-list">
                        <li>DMR 1</li>
                        <li>DMR 2</li>
                        <li>DMR 3</li>
                    </ul>
                    <section>
                        Add teammates
                    </section>
                </section>
            </section>

            <footer id="footer">
                <section id="footer-name">
                    Place Holder Name
                </section>
                <section id="footer-button">
                    <button>O H</button>
                </section>
            </footer>
        </aside>
    )
}

export default LeftBar
