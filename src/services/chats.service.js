import ChatModel from "@/models/Chat.model"; 

export const getAllChats_service = async () => {
	try {
		const chats = await ChatModel.find({})
		console.log(chats);
		return chats;
	} catch (error) {
		console.log(error);
	}
};
