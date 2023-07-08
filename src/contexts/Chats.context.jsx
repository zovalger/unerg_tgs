import socketEventsSystem from "@/config/socketEventsSystem";
import { useRouter } from "next/router";
import SocketContext from "./Socket.context";
import ToastContext from "./Toast.context";
import UserContext from "./User.context";
import { getAllNamesUsers_Request } from "@/api/chat.api";
import { sendImg_Request } from "@/api/file.api";

const { createContext, useState, useEffect, useContext } = require("react");

const ChatsContext = createContext();

// ****************************************************************************
// 									datos y autenticacion del usuario
// ****************************************************************************

export const ChatsProvider = ({ children }) => {
	const { socket } = useContext(SocketContext);
	const { user, setUser } = useContext(UserContext);
	const { hideAllToasts, showLoadingToast, showInfoToast, showErrorToast } =
		useContext(ToastContext);

	const [messages, setMessages] = useState([]);
	const [chats, setChats] = useState([]);
	const [chat_Id, setChat_Id] = useState("");
	const [chatsObj, setChatsObj] = useState({});

	const [userNames, setUserNames] = useState({});

	useEffect(() => {
		if (!socket) return;
		reciveMessage();
		reciveChats();
		reciveOldMessages();
	}, [socket]);

	useEffect(() => {
		if (!user) return;

		refreshNamesUsers();
	}, [user]);

	const refreshNamesUsers = async () => {
		const { data: n } = await getAllNamesUsers_Request();

		setUserNames(n);
	};

	useEffect(() => {
		//TODO: REMOVE ME
		console.log(chatsObj);
		console.log(chats);
		console.log(chat_Id);
	}, [chatsObj, chats, chat_Id]);

	// *******************************************************
	// 									Sockets
	// *******************************************************

	//TODO: sort old messages

	// ************************** Funciones Chat **************************

	const chatConnection = (id) => {
		if (!user) return;

		if (user.role === "admin" || user.role === "root") {
			for (let i = 0; i < chats.length; i++) {
				if (chats[i].driverId === id) {
					setChat_Id(chats[i]._id.toString());
					break;
				}
			}
		} else if (user.role === "driver") {
			setChat_Id(chats[0]._id.toString());
		}
	};

	//Enviar
	const sendMessage = async (text, imageFile, response = null) => {
		try {
			let message = {
				_chatId: null,
				text: text,
				urlPhoto: {
					url: null,
					imgfileId: null,
				},
				response,
				driverId: null,
				adminId: null,
				isSent: true,
			};

			//chatId para mensajes
			if (user.role === "driver") {
				message.driverId = user._id;
				message._chatId = chats[0]._id.toString();
			} else if (user.role === "admin") {
				message.adminId = user._id;
				message._chatId = chat_Id;
			} else if (user.role === "root") {
				message._chatId = chat_Id;
			}

			if (imageFile) {
				showLoadingToast("Subiendo imagen");

				const { data } = await sendImg_Request({ data: imageFile });

				hideAllToasts();

				message.urlPhoto.url = data.url;
				message.urlPhoto.imgfileId = data._id;
			}

			addNewMessageToChatObj(message, message._chatId);

			socket.emit(socketEventsSystem.sendMessage, message, (res) => {
				if (!res) return;
				
				setMessages([...messages, res]);
			});
		} catch (error) {
			hideAllToasts();

			showErrorToast("No se envio el mensaje");
		}
	};

	//Recibir
	const reciveMessage = () => {
		socket.on(socketEventsSystem.reciveMessage, (newMessage) => {
			if (!newMessage) return;
			showInfoToast("Nuevo mensaje");
			addNewMessageToChatObj(newMessage, newMessage._chatId);
			setMessages((prevMessages) => [...prevMessages, newMessage]);
		});
	};

	// ************************** Recibir mensajes y chats desde la db **************************

	//recibir Mensajes
	const reciveOldMessages = () => {
		socket.on(socketEventsSystem.loadMessages, (data) => {
			if (!data) return;
			data.sort(dateCompare);
			const messages = data.map((obj) => {
				return {
					...obj,
					isSent: false,
				};
			});
			messages.forEach((message) =>
				addNewMessageToChatObj(message, message._chatId.toString())
			);
			console.log(messages);
		});
	};

	//Recibir chats
	const reciveChats = () => {
		socket.on(socketEventsSystem.sendChats, (chats) => {
			if (!chats || (Array.isArray(chats) && chats.length === 0)) return;
			if (!Array.isArray(chats)) {
				chats = [chats];
			}
			setChats(chats);
			chats.forEach((chat) => addChatToObj(chat));
		});
	};

	// ************************** Funciones del chatObj **************************

	//Agregar chat a objeto de chats
	const addChatToObj = (chat) => {
		if (!chat) return;
		const { _id } = chat;
		setChatsObj((prevChatsObj) => ({
			...prevChatsObj,
			[_id]: [],
		}));
	};

	//Agregar Mensaje a objeto de chats
	const addNewMessageToChatObj = (newMessage, chatId) => {
		if (!chatId || !newMessage) return;
		setChatsObj((prevChatsObj) => ({
			...prevChatsObj,
			[chatId]: Array.isArray(prevChatsObj[chatId])
				? [...prevChatsObj[chatId], newMessage]
				: [newMessage],
		}));
	};

	// ************************** Funciones de Orden **************************

	const dateCompare = (a, b) => {
		if (a.createdAt < b.createdAt) {
			return -1;
		}
		if (a.createdAt > b.createdAt) {
			return 1;
		}
		return 0;
	};

	return (
		<ChatsContext.Provider
			value={{
				messages,
				chatsObj,
				chat_Id,

				sendMessage,
				chatConnection,

				// utils
				userNames,
				refreshNamesUsers,
			}}
		>
			{children}
		</ChatsContext.Provider>
	);
};

export default ChatsContext;
