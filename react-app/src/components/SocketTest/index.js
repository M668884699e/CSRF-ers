
import { useState, useEffect } from "react"
import { io } from "socket.io-client";
let socket;

const SocketTest = () => {
    const [counter, setCounter] = useState(1)
    const [socketMessage, setSocketMessage] = useState([])

    useEffect(() => {
        socket = io();
        socket.on("chat", (data) => {
            console.log("socket data", data)

            setSocketMessage(socketMessage => [...socketMessage, data])
        })



        console.log("socket message", socketMessage)

        return (() => {
            socket.disconnect()
        })

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
                Socket Test
            </button>
            <section>
                {socketMessage}
            </section>
        </div>
    )
}

export default SocketTest
