import socketEventsSystem from "@/config/socketEventsSystem";
import dbConnect from "@/lib/db";
import AdminModel from "@/models/Admin.model";
import DriverModel from "@/models/Driver.model";

import {
	getAllChats_service,
	getChatsByDriverId_service,
	saveNewMessage_service,
	getAllMessages_service,
	getMessagesByChatId_service,
} from "@/services/chats.service";

export const chatSocketController = (io, socket, user) => {
	if (!io || !socket || !user) return;

	roomsUserJoin(io, socket, user);

	socket.on(socketEventsSystem.sendMessage, async (message) => {
		message.isSent = false;
		console.log(message);
		const messageSaved = await saveNewMessage_service(message);
		socket
			.to(message.chatId)
			.emit(socketEventsSystem.reciveMessage, messageSaved);
	});

	socket.on(socketEventsSystem.loadMessagesReq, async () => {});
};

//Carga de mensajes antiguos
const loadOldMessages = async (socket, user, chatId) => {
	if (user.role === "admin" || user.role === "root") {
		const messages = await getAllMessages_service();
		if (!messages) return;
		console.log(messages);
		socket.emit(socketEventsSystem.loadMessages, messages);
	} else if (user.role === "driver") {
		const messages = await getMessagesByChatId_service(chatId);
		if (!messages) return;
		console.log(messages);
		socket.emit(socketEventsSystem.loadMessages, messages);
	}
};

//Funcion encargada de unir al usuario a las rooms de socket
export const roomsUserJoin = async (io, socket, user) => {
	await dbConnect();

	//se determina el roll del usuario
	if (user.role === "driver") {
		//de ser conductor se trae unicamente su chat de la db
		const chat = await getChatsByDriverId_service(user._id);
		if (!chat) return;

		//se une a la room de socket y se envia el chat al front
		socket.join(chat._id.toString());
		loadOldMessages(socket, user, chat._id.toString());
		socket.emit(socketEventsSystem.sendChats, chat);
	} else if (user.role === "admin" || user.role === "root") {
		//de ser admin o root se traen todos los chats
		const chats = await getAllChats_service();
		if (!chats) return;

		//se une a todas las rooms y se envian los chats al front
		chats.forEach((chat) => {
			socket.join(chat._id.toString());
		});
		loadOldMessages(socket, user);
		socket.emit(socketEventsSystem.sendChats, chats);
	}
};
