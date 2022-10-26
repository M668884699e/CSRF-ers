import React from "react";

import "./MessagePage.css"

// import components
import LeftBar from "./LeftBar"
// import MessageSender from "./MessageSender"
// import MessageDisplay from "./MessageDisplay"
// import ProfileBar from "./ProfileBar"
import SearchBar from "./SearchBar"


const MessagePage = () => {
    return (
        <section id="message-page-main">
            <SearchBar/>

            <LeftBar />

            {/* <ProfileBar /> */}

            {/* <MessageDisplay /> */}

            {/* <MessageSender /> */}
        </section>
    )
}


export default MessagePage
