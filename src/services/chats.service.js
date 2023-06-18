import ChatModel from "@/models/Chat.model"; 

import { createChatForDriver_service } from "@/services/userDriver.service";

export const getChatsByDriverId_service = async (_id) => {
	try {
		console.log(_id)
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
		console.log(chats); //TODO: Remove me
		return chats;
	} catch (error) {
		console.log(error);
	};
};
