// import css
import "./LeftBar.css"

import { useState, useEffect, useContext } from "react"
import { useSelector, useDispatch } from "react-redux"

import { useChannel } from '../../../context/ChannelContext';

import * as channelActions from "../../../store/channel"
import * as dmrActions from "../../../store/channel"
import * as sessionActions from "../../../store/session"
import { thunkGetUserChannels } from "../../../store/channel"


const LeftBar = () => {
    // const { channels, setChannels } = useChannel();
    // const allChannels = useSelector(channelActions.getAllChannels);
    // const currentUserId = useSelector(sessionActions.getCurrentUserId);

    // console.log("testsam", allChannels)

    // // invoke dispatch
    // const dispatch = useDispatch();


    // // load channels
    // useEffect(() => {
    //     dispatch(channelActions.thunkGetUserChannels());
    //     // dispatch(dmrActions.getAllDmrs())
    // }, [dispatch]);

    // // per channelState
    // useEffect(() => {
    //     // set channels
    //     console.log(allChannels)
    //     console.log(currentUserId)
    //     setChannels(allChannels);
    // }, [allChannels]);



    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(channelActions.thunkGetUserChannels());
    }, [dispatch])

    const allChannels = useSelector(channelActions.getAllChannels);
    const currentUserId = useSelector(sessionActions.getCurrentUserId);


    const test = useSelector(channelActions.getAllChannels);
    console.log("test", test)

    const loadAllChannels = () => {
        return (
            allChannels && Object.values(allChannels).map((el, i) => {
                console.log('el', el)
                return (
                    <section className="channel-list-option">
                        <aside><i className="fa-regular fa-hashtag"></i></aside>
                        <aside>{el.channel_name}</aside>
                    </section>
                )
            })
        )
    }

    return (
        <aside id="left-bar-main">
            <section id="section-one">
                <section id="server-name">
                    <h4>Place Holder Name</h4>
                    <button id="new-message-button">
                        <i className="fa-regular fa-pen-to-square" />
                    </button>
                </section>
            </section>

            <section id="section-two">
                <section className="section-two-options">
                    <i className="fa-regular fa-comment"></i>
                    <aside>Threads</aside>
                    {/* <aside className="new-notification">NEW</aside> */}
                </section>
                <section className="section-two-options">
                    <i className="fa-regular fa-comments"></i>
                    <aside>Direct messages</aside>
                    {/* <aside className="new-notification">NEW</aside> */}
                </section>
                <section className="section-two-options">
                    <i className="fa-regular fa-at"></i>
                    <aside>Mentions & reactions</aside>
                    {/* <aside className="new-notification">NEW</aside> */}
                </section>
                <section className="section-two-options">
                    <i className="fa-regular fa-paper-plane"></i>
                    <aside>Drafts & sent</aside>
                    {/* <aside className="new-notification">NEW</aside> */}
                </section>
                <section className="section-two-options">
                    <i className="fa-regular fa-building"></i>

                    <aside>Slack Connect</aside>
                    {/* <aside className="new-notification">NEW</aside> */}
                </section>
                <section className="section-two-options">
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                    <aside>More</aside>
                    {/* <aside className="new-notification">NEW</aside> */}
                </section>
            </section>

            <section id="section-three">
                <section id="channel-section">
                    <details>
                        <summary id="channel-header">Channels</summary>
                        <section id="channel-list">
                            {loadAllChannels()}
                            <section className="channel-list-option">
                                <aside><i className="fa-regular fa-plus"></i></aside>
                                <aside>Browse Channels</aside>
                            </section>
                        </section>
                    </details>
                </section>

                <section id="section-four">
                    <section id="dmr-section">
                        <details>
                            <summary id="dmr-header">Direct messages</summary>
                            <section id="dmr-list">
                                <section className="dmr-list-option">
                                    <aside><i className="fa-regular fa-hashtag"></i></aside>
                                    <aside>DMR 1</aside>
                                </section>
                                <section className="dmr-list-option">
                                    <aside><i className="fa-regular fa-hashtag"></i></aside>
                                    <aside>DMR 2</aside>
                                </section>
                                <section className="dmr-list-option">
                                    <aside><i className="fa-regular fa-hashtag"></i></aside>
                                    <aside>DMR 3</aside>
                                </section>
                                <section className="dmr-list-option">
                                    <aside><i className="fa-regular fa-plus"></i></aside>
                                    <aside>Add teammates</aside>
                                </section>
                            </section>
                        </details>
                    </section>
                </section>
            </section>

            <footer id="footer">
                <section id="footer-name">
                    Place Holder Name
                </section>
                <section id="footer-button">
                    <button id="communication"><i className="fa-solid fa-headphones"></i></button>
                </section>
            </footer>
        </aside>
    )
}

export default LeftBar
