// css
import './MessageForm.css'
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as messageActions from '../../../store/message';

// import Lexical field
import { Editor } from '../../Editor/Editor';
import { useSelector, useDispatch } from 'react-redux';

import { getChatById } from '../../../store/channel';
import { thunkGetChannelMessages } from '../../../store/message';
import { thunkGetAllDmrMessages } from '../../../store/dmr';

const MessageForm = () => {
    const dispatch = useDispatch();
    const messages = useSelector(state => state.messages)
    // message post details
    const [message, setMessage] = useState('');
    const [messageable_type, setMesseageble_type] = useState('channels')
    const [messageableUrl, setMessageableUrl] = useState(window.location.href.split('/')[4]);

    // grab type of message from url then convert it into proper value
    // let messageableUrl = window.location.href.split('/')[4];

    // convert messageableUrl val into messeagable_type val
    // let messageable_type
    useEffect( () => {
        if(messageableUrl === 'channels'){
            setMesseageble_type(messageableUrl[0].toUpperCase() + messageableUrl.slice(1, -1));
        }else if(messageableUrl === 'dmrs'){
            setMesseageble_type(messageableUrl.slice(0, -1).toUpperCase());
        }
    }, [dispatch, messageableUrl])

    useEffect( () => {

    }, [messageable_type])


    // userId
    const userId = useSelector(state => state.session.user.id)

    // deconstruct channelId
    let { channelId, dmrId } = useParams();

    channelId = Number(channelId);
    dmrId = Number(dmrId);

    
    const chatId = channelId ? channelId : dmrId;
    

    const messagePost = async (e) => {
        e.preventDefault();

        const newMessage = {
            message,
            messageable_id: chatId,
            messageable_type,
            sender_id: userId
        }

        return await dispatch(messageActions.thunkCreateMessage(newMessage))
            .then( () => {
                setMessage('');
                dispatch(thunkGetChannelMessages(chatId, messageableUrl))
            } 
            
        )
    }

    const updateMessage = e => {
        setMessage(e.target.value);
    };



    return (
        <form onSubmit={messagePost} id="message-form">
            <div className='message-error-container'>

            </div>
            <div id='message-container'>
                {/* <input
                    name='message'
                    type='text'
                    placeholder='enter a message'
                    value={message}
                    onChange={updateMessage}
                > */}
                <textarea
                    name='message'
                    type='text'
                    placeholder='enter a message'
                    value={message}
                    onChange={updateMessage}
                >
                    <Editor />
                </textarea>
                {/* </input> */}
            </div>
            <button type='submit'>
                <i className="fa-solid fa-paper-plane"></i>
            </button>

        </form>
    );
}

export default MessageForm;