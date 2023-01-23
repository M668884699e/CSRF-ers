<<<<<<< HEAD

import { useState, useEffect } from "react"
import { io } from "socket.io-client";
let socket;

const SocketTest = () => {
=======
import "./socketTest.css"

import { useState, useEffect } from "react"
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";

import * as messageActions from "../../store/message"

let socket;

const SocketTest = () => {
    const dispatch = useDispatch();

>>>>>>> sockets-for-message-form
    const [counter, setCounter] = useState(1)
    const [socketMessage, setSocketMessage] = useState([])

    useEffect(() => {
        socket = io();
<<<<<<< HEAD
        socket.on("chat", (data) => {
            console.log("socket data", data)

            setSocketMessage(socketMessage => [...socketMessage, data])
        })



        console.log("socket message", socketMessage)

=======

        socket.on("message", (data) => {
            console.log("front end data", data)

            setSocketMessage(socketMessage => [...socketMessage, data["message"]["message"]])
        })

>>>>>>> sockets-for-message-form
        return (() => {
            socket.disconnect()
        })

<<<<<<< HEAD
    }, [counter])

    const sendTest = () => {
        setCounter(counter + 1)

        console.log("hello world")

        socket.emit("chat", { "counter": counter })

        console.log('goodbye world')
    }

    return (
        <div>
            <button onClick={() => sendTest()}>
=======
    }, [])

    const sendTest = async () => {
        setCounter(counter + 1)

        const test = {
            message: "aaaaaah",
            messageable_id: 1,
            messageable_type: "channel",
            sender_id: 1,
        };

        await dispatch(messageActions.thunkCreateMessage(test)).then((data) => {
            console.log("data:", data)
            socket.send({ "message": test })
        })
    }

    return (
        <div id="i_hate_you">
            <button onClick={(e) => {
                e.preventDefault()
                sendTest()
            }}>
>>>>>>> sockets-for-message-form
                Socket Test
            </button>
            <section>
                {socketMessage}
            </section>
        </div>
    )
}

export default SocketTest
