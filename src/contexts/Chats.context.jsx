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
	const [chat_Id, setChat_Id] = useState("");
	const [chatsObj, setChatsObj] = useState({});

	useEffect(() => {
		if (!socket) return;
		reciveMessage();
		reciveChats();
	}, [socket]);

	//useEffect(() => {		TODO: REMOVE ME
	//	console.log(chatsObj);
	//	console.log(chats);
	//	console.log(chat_Id)
	//}, [chatsObj, chats, chat_Id])

	// *******************************************************
	// 									Sockets
	// *******************************************************

	//TODO: integraion db
	//TODO: buscar novia

	// ************************** Funciones Chat **************************

	const chatConnection = (id) => {
		if (user.role === "admin" || user.role === "root") {
			for (let i = 0 ; i < chats.length ; i++) {
				if (chats[i].driverId === id) {
				  setChat_Id(chats[i]._id.toString());
				  break;
				};
			};
		} else if (user.role === "driver") {
			setChat_Id(chats[0]._id.toString());
		}
	};


	//Enviar
	const sendMessage = (newMessage) => {
		let data = {
			chatId: "",
			text: newMessage,
			driverId: "",
			adminId: "",
			isSent: true,
		};

		//chatId para mensajes
		if (user.role === "driver") {
			data.driverId = user._id;
			data.adminId = null;
			data.chatId = chats[0]._id.toString()
		} else if (user.role === "admin") {
			data.adminId = user._id;
			data.driverId = null;
			data.chatId = chat_Id;
		} else if (user.role === "root") {
			data.chatId = chat_Id;
			data.driverId = null;
			data.adminId = null;
		};
		
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

	// ************************** Recibir mensajes y chats desde la db **************************

	//recibir Mensajes
	const loadMessages = () => {
		socket.emit(socketEventsSystem.loadMessages);
	};

	//Recibir chats
	const reciveChats = () => {
		socket.on(socketEventsSystem.sendChats, (chats) => {
			if (!chats || (Array.isArray(chats) && chats.length === 0)) return
			if (!Array.isArray(chats)) {
				chats = [chats];
			}
			setChats(chats);
			chats.forEach(chat => addChatToObj(chat));
		});
	};

	// ************************** Funciones del chatObj **************************

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
				chat_Id,

				sendMessage,
				chatConnection,
				loadMessages,
			}}
		>
			{children}
		</ChatsContext.Provider>
	);
};

export default ChatsContext;
