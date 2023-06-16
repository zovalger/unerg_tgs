import ChatModel from "@/models/Chat.model"; //por alguna razon, al borrar esto todo funciona

//funcion culera no hace nah, no esta siendo invocada en ningun lugar, solo importada al contexto chats
export const getAllChats_service = async () => {
	try {
		const chat = await ChatModel.find()
		return chat;
	} catch (error) {
		console.log(error);
	}
};

//PD: no hay mas codigo porque de tanto dar vueltas y no encontrar el error decidi iniciar de 0 con un git clone