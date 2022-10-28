import React from "react";

import "./MessagePage.css"

// import components
import LeftBar from "./LeftBar"
import ProfileBar from "./ProfileBar"
import MessageSender from "./MessageSender"
import MessageDisplay from "./MessageDisplay"
import SearchBar from "./SearchBar"


const MessagePage = () => {
    return (
        <div id="message-page-main">
            <section id="message-page-header">
                <SearchBar/>
            </section>
            <section id="message-page-body">
                {/* Left Bar */}
                <aside id="left-bar">
                    <LeftBar />
                </aside>

                {/* Message Display */}
                <aside id="message-display">
                    <MessageDisplay />
                </aside>
                
                {/* <MessageSender /> */}
                <aside id="message-sender">
                </aside>
                
                {/* Message Profile Bar */}
                <aside id="message-profile">
                    <ProfileBar />
                </aside>
            </section>


        </div>
    )
}


export default MessagePage
