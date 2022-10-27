// import css
import "./MessageDisplay.css"

const MessageDisplay = () => {
    return (
        <section id = "message-display-main">
            <section id="message-header-one">
                <section id="message-header-name">
                    Test Message Name
                </section>
                <section id="message-header-link">
                    Zoom Link: <a href="https://www.google.com">https://www.google.com</a>
                </section>
            </section>
            <section id="message-header-two">
                <section id="message-pin">
                    <button>
                        0 Pinned
                    </button>
                </section>
                <section id="message-bookmark">
                    <button>
                        + Add a bookmark
                    </button>
                </section>
            </section>
            <section id="message-display-container">
                <section class="message">Test Message 1</section>
                <section class="message">Test Message 2</section>
                <section class="message">Test Message 3</section>
                <section class="message">Test Message 4</section>
                <section class="message">Test Message 5</section>
                <section class="message">Test Message 6</section>
                <section class="message">Test Message 7</section>
            </section>
        </section>
    )
}


export default MessageDisplay
