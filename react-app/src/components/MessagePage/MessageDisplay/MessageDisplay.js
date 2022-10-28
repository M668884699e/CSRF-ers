// import css
import "./MessageDisplay.css"

const MessageDisplay = () => {
    return (
        <section id="message-display-main">
            <section id="message-main-header">
                <section id="message-main-header-left">
                    <button id="message-main-header-name">
                        Test Message Name
                    </button>
                    <aside id="message-main-header-link">
                        Zoom Link: <a href="https://www.google.com">https://www.google.com</a>
                    </aside>
                </section>
                <section id="message-main-header-right">
                    <button>Members</button>
                </section>
            </section>
            <section id="message-sub-header">
                <aside class="message-sub-header-section">
                    <button class="message-sub-header-buttons">
                        0 Pinned
                    </button>
                </aside>
                <aside class="message-sub-header-section">
                    <button class="message-sub-header-buttons">
                        + Add a bookmark
                    </button>
                </aside>
                <aside class="message-sub-header-section">
                    <button class="message-sub-header-buttons">
                        +
                    </button>
                </aside>
            </section>
            <section id="message-display-container">
                <section class="message">
                    <aside class="profile-pic">
                        <button>PP</button>
                    </aside>
                    <aside>Test Message 1</aside>
                </section>
                <section class="message">
                    <aside class="profile-pic">
                        <button>PP</button>
                    </aside>
                    <aside>Test Message 2</aside>
                </section>
                <section class="message">
                    <aside class="profile-pic">
                        <button>PP</button>
                    </aside>
                    <aside>Test Message 3</aside>
                </section>
                <section class="message">
                    <aside class="profile-pic">
                        <button>PP</button>
                    </aside>
                    <aside>Test Message 4</aside>
                </section>
                <section class="message">
                    <aside class="profile-pic">
                        <button>PP</button>
                    </aside>
                    <aside>Test Message 5</aside>
                </section>
                <section class="message">
                    <aside class="profile-pic">
                        <button>PP</button>
                    </aside>
                    <aside>Test Message 6</aside>
                </section>
                <section class="message">
                    <aside class="profile-pic">
                        <button>PP</button>
                    </aside>
                    <aside>Test Message 7</aside>
                </section>
            </section>
        </section>
    )
}


export default MessageDisplay
