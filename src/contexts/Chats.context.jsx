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
	const [chatsObj, setChatsObj] = useState({});

	useEffect(() => {
		if (!socket) return;
		reciveMessage();
		reciveChats();
	}, [socket]);

	useEffect(() => { //TODO: REMOVE ME
		console.log(chatsObj);
		console.log(chats);
	}, [chatsObj, chats])

	// *******************************************************
	// 									Sockets
	// *******************************************************

	//TODO: integraion db
	//TODO: buscar novia

	const chatConnection = (id) => {
		setDriverId(id);
	};


	//Enviar

	const sendMessage = (newMessage) => {
		let data = {
			chatId: "",
			text: newMessage,
			driverId: "",
			adminId: "",
		};

		//chatId para mensajes
		if (user.role === "driver") {
			data.driverId = user._id;
			data.chatId = chats[0]._id.toString()
		} else if (user.role === "admin") {
			data.adminId = user._id;
			for (let i = 0; i < chats.length; i++) {
				if (chats[i].driverId === driverId) {
				  data.chatId = chats[i]._id.toString();
				  break;
				};
			};
		};
		
		//objeto chats (sin uso por el momento)
		addNewMessageToChatObj(data, data.chatId);

		setMessages([...messages, data]);
		socket.emit(socketEventsSystem.sendMessage, data);
	};


	//Recibir

	const reciveMessage = () => {
		socket.on(socketEventsSystem.reciveMessage, (newMessage) => {
			if (!newMessage) return
			addNewMessageToChatObj(newMessage, newMessage.chatId);
			setMessages((prevMessages) => [...prevMessages, newMessage]);
		});
	};


	//Recibir chats
	const reciveChats = () => {
		socket.on(socketEventsSystem.sendChats, (chats) => {
			console.log(chats)
			if (!chats || (Array.isArray(chats) && chats.length === 0)) return
			if (!Array.isArray(chats)) {
				chats = [chats];
			}
			setChats(chats);
			chats.forEach(chat => addChatToObj(chat));
		});
	};

	//Agregar chat a objeto de chats
	const addChatToObj = (chat) => {
		if (!chat) return
		const { _id } = chat;
		setChatsObj(prevChatsObj => ({
			...prevChatsObj,
			[_id]: []
		}));
	};

	//Agregar Mensaje a objeto de chats
	const addNewMessageToChatObj = (newMessage, chatId) => {
		if (!chatId || !newMessage) return
		setChatsObj(prevChatsObj => ({
			...prevChatsObj,
			[chatId]: Array.isArray(prevChatsObj[chatId]) ? [...prevChatsObj[chatId], newMessage] : [newMessage]
		}));
	};



	return (
		<ChatsContext.Provider
			value={{
				messages,
				chatsObj,
				driverId,

				sendMessage,
				chatConnection,
			}}
		>
			{children}
		</ChatsContext.Provider>
	);
};

export default ChatsContext;
