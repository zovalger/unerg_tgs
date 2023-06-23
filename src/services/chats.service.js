import ChatModel from "@/models/Chat.model"; 

import { createChatForDriver_service } from "@/services/userDriver.service";

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
