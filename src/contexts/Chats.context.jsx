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

	const [messages] = useState([]);


	// *******************************************************
	// 									Sockets
	// *******************************************************

	//TODO: Mensajes desde contexto

	//TODO: Schemas

	//TODO: integraion db


	//TODO: if (!socket) return
	const sendMessage = (message) => {
		socket.emit(socketEventsSystem.sendMessage, message);
	};

	const reciveMessage = (message) => {
		socket.on(socketEventsSystem.reciveMessage, message);
		
		return () => {
			socket.off(socketEventsSystem.reciveMessage, message);
		};
	};

	return (
		<ChatsContext.Provider
			value={{
				messages,

				sendMessage,
				reciveMessage,
			}}
		>
			{children}
		</ChatsContext.Provider>
	);
};

export default ChatsContext;
