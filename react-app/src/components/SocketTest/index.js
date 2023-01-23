// import "./socketTest.css"

// import { useState, useEffect } from "react"
// import { io } from "socket.io-client";
// import { useDispatch } from "react-redux";

// import * as messageActions from "../../store/message"

// let socket;

// const SocketTest = () => {
//     const dispatch = useDispatch();

//     const [counter, setCounter] = useState(1)
//     const [socketMessage, setSocketMessage] = useState([])

//     useEffect(() => {
//         socket = io();

//         socket.on("message", (data) => {
//             console.log("front end data", data)

//             setSocketMessage(socketMessage => [...socketMessage, data["message"]["message"]])
//         })

//         return (() => {
//             socket.disconnect()
//         })

//     }, [])

//     const sendTest = async () => {
//         setCounter(counter + 1)

//         const test = {
//             message: "aaaaaah",
//             messageable_id: 1,
//             messageable_type: "channel",
//             sender_id: 1,
//         };

//         await dispatch(messageActions.thunkCreateMessage(test)).then((data) => {
//             console.log("data:", data)
//             socket.send({ "message": test })
//         })
//     }

//     return (
//         <div id="i_hate_you">
//             <button onClick={(e) => {
//                 e.preventDefault()
//                 sendTest()
//             }}>
//                 Socket Test
//             </button>
//             <section>
//                 {socketMessage}
//             </section>
//         </div>
//     )
// }

// export default SocketTest
