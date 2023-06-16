import socketEventsSystem from "@/config/socketEventsSystem";
import { useRouter } from "next/router";
import SocketContext from "./Socket.context";
import ToastContext from "./Toast.context";
import UserContext from "./User.context";

const { createContext, useState, useEffect, useContext } = require("react");

const ChatsContext = createContext();

// ****************************************************************************
// 									datos y autenticacion del usuario
// ****************************************************************************

export const ChatsProvider = ({ children }) => {
	const { socket } = useContext(SocketContext);
	const { user, setUser } = useContext(UserContext);
	const { withLoadingSuccessAndErrorFuntionsToast } = useContext(ToastContext);

	const [messages, setMessages] = useState([]);


	useEffect(() => {
		if (!socket) return;
		reciveMessage();
	}, [socket]);

	// *******************************************************
	// 									Sockets
	// *******************************************************

	//TODO: Schemas

	//TODO: integraion db

	const chatConnection = () => {
		console.log("ola k hace")
		socket.emit(socketEventsSystem.chatConnection);
	};

	const sendMessage = (newMessage) => {
		let data = {
			chatId: "",
			text: newMessage,
			driverId: "",
			adminId: ""
		}
		setMessages([...messages, data]);
		socket.emit(socketEventsSystem.sendMessage, data);
	};

	const reciveMessage = () => {
		socket.on(socketEventsSystem.reciveMessage, (newMessage) => {
			console.log(newMessage)
		 	setMessages((prevMessages) => [...prevMessages, newMessage ]);
		});
	  };

	return (
		<ChatsContext.Provider
			value={{
				messages,

				sendMessage,
				chatConnection
			}}
		>
			{children}
		</ChatsContext.Provider>
	);
};

export default ChatsContext;
