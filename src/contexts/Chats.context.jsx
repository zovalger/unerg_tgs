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
	const [chats, setChats] = useState([]);
	const [driverId, setDriverId] = useState("");

	useEffect(() => {
		if (!socket) return;
		reciveMessage();
		reciveChats()
	}, [socket]);

	// *******************************************************
	// 									Sockets
	// *******************************************************

	//TODO: integraion db
	//TODO: buscar novia

	const chatConnection = (id) => {
		setDriverId(id)
		console.log(driverId)
	};


	//Enviar

	const sendMessage = (newMessage) => {
		let data = {
			chatId: "",
			text: newMessage,
			driverId: "",
			adminId: "",
		};
		console.log(chats)
		console.log(driverId)
		if (user.role === "driver") {
			data.driverId = user._id;
			data.chatId = chats._id.toString()
		} else if (user.role === "admin") {
			data.adminId = user._id;
			for (let i = 0; i < chats.length; i++) {
				if (chats[i].driverId === driverId) {
				  data.chatId = chats[i]._id;
				  break;
				};
			};
		};
		
		setMessages([...messages, data]);
		socket.emit(socketEventsSystem.sendMessage, data);
		console.log("message send");
	};


	//Recibir

	const reciveMessage = () => {
		socket.on(socketEventsSystem.reciveMessage, (newMessage) => {
			console.log(newMessage);
			setMessages((prevMessages) => [...prevMessages, newMessage]);
		});
	};


	//Recibir chats

	const reciveChats = () => {
		socket.on(socketEventsSystem.sendChats, (data) => {
			console.log(data, "chats del front")
			setChats(data);
		});
	};


	return (
		<ChatsContext.Provider
			value={{
				messages,

				sendMessage,
				chatConnection,
			}}
		>
			{children}
		</ChatsContext.Provider>
	);
};

export default ChatsContext;
