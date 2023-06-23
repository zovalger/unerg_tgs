import ChatModel from "@/models/Chat.model"; 
import MessageModel from "@/models/Message.model";

import { createChatForDriver_service } from "@/services/userDriver.service";

// ****************************** Chats Services ******************************

export const getChatsByDriverId_service = async (_id) => {
	try {
		let chat = await ChatModel.findOne({driverId: _id})
		if (!chat) {
			chat = await createChatForDriver_service(_id);
		};
		console.log(chat)
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
			_chatId: data.chatId,
			text: data.text,
			driverId: data.driverId,
			adminId: data.adminId,
		});
		await newMessage.save()
	} catch (error) {
		console.log(error);
	};
};

export const saveNewPhoto_service = async () => {

};

export const getAllMessages_service = async () => {
	try {
		const messages = await MessageModel.find({})
		console.log(messages)
		return messages;
	} catch (error) {
		console.log(error);
	};
};