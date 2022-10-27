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
                <LeftBar />
                <MessageDisplay />
            </section>

            {/* <ProfileBar /> */}


            {/* <MessageSender /> */}
        </div>
    )
}


export default MessagePage
