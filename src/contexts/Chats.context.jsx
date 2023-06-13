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

	//TODO: Mensajes desde contexto

	//TODO: Schemas

	//TODO: integraion db


	//TODO: if (!socket) return
	const sendMessage = (newMessage) => {
		setMessages([...messages, newMessage]);
		socket.emit(socketEventsSystem.sendMessage, newMessage);
	};

	const reciveMessage = () => {
		socket.on(socketEventsSystem.reciveMessage, (newMessage) => {
		  setMessages((prevMessages) => [...prevMessages, newMessage]);
		});
	  };

	return (
		<ChatsContext.Provider
			value={{
				messages,

				sendMessage,
			}}
		>
			{children}
		</ChatsContext.Provider>
	);
};

export default ChatsContext;
