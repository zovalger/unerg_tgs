import ChatModel from "@/models/Chat.model"; 
import MessageModel from "@/models/Message.model";

import { createChatForDriver_service } from "@/services/userDriver.service";
import { BiMessageSquare } from "react-icons/bi";

// ****************************** Chats Services ******************************

export const getChatsByDriverId_service = async (_id) => {
	try {
		let chat = await ChatModel.findOne({driverId: _id})
		if (!chat) {
			chat = await createChatForDriver_service(_id);
		};
		return chat;
	} catch (error) {
		console.log(error);
	};
};

export const getAllChats_service = async () => {
	try {
		const chats = await ChatModel.find({})
		return chats;
	} catch (error) {
		console.log(error);
	};
};

// ****************************** Message Services ******************************

export const saveNewMessage_service = async (data) => {
	try {
		const newMessage = new MessageModel({ 
			_chatId: data._chatId,
			text: data.text,
			urlPhoto: {
				url: data.urlPhoto.url,
				imgfileId: data.urlPhoto.imgfileId
			},
			response: data.response,
			driverId: data.driverId,
			adminId: data.adminId
		});
		await newMessage.save()
	} catch (error) {
		console.log(error);
	};
};

export const saveNewPhoto_service = async () => {

};

export const getMessagesByChatId_service = async (chatId) => {
	try {
		let messages = await MessageModel.find({_chatId: chatId})
		return messages;
	} catch (error) {
		console.log(error);
	};
};

export const getAllMessages_service = async () => {
	try {
		const messages = await MessageModel.find({})
		return messages;
	} catch (error) {
		console.log(error);
	};
};