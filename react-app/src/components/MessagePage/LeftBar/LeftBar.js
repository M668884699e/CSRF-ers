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
                    {/* <aside class="new-notification">NEW</aside> */}
                </section>
                <section className="section-two-options">
                    <aside>Direct messages</aside>
                    {/* <aside class="new-notification">NEW</aside> */}
                </section>
                <section className="section-two-options">
                    <aside>Mentions & reactions</aside>
                    {/* <aside class="new-notification">NEW</aside> */}
                </section>
                <section className="section-two-options">
                    <aside>Drafts & sent</aside>
                    {/* <aside class="new-notification">NEW</aside> */}
                </section>
                <section className="section-two-options">
                    <aside>Slack Connect</aside>
                    {/* <aside class="new-notification">NEW</aside> */}
                </section>
                <section className="section-two-options">
                    <aside>More</aside>
                    {/* <aside class="new-notification">NEW</aside> */}
                </section>
            </section>

            <section id="section-three">
                <section id="channel-section">
                    <details>
                        <summary id="channel-header">Channels</summary>
                        <section id="channel-list">
                            <section class="channel-list-option">Channel 1</section>
                            <section class="channel-list-option">Channel 2</section>
                            <section class="channel-list-option">Channel 3</section>
                            <section class="channel-list-option">+ Browse Channels</section>
                        </section>
                    </details>
                </section>
                <section id="dmr-section">
                    <details>
                        <summary id="dmr-header">Direct messages</summary>
                        <section id="dmr-list">
                            <section class="dmr-list-option">DMR 1</section>
                            <section class="dmr-list-option">DMR 2</section>
                            <section class="dmr-list-option">DMR 3</section>
                            <section class="dmr-list-option">+ Add teammates</section>
                        </section>
                    </details>
                </section>
            </section>

            <footer id="footer">
                <section id="footer-name">
                    Place Holder Name
                </section>
                <section id="footer-button">
                    <button id="tests">O H</button>
                </section>
            </footer>
        </aside>
    )
}

export default LeftBar
