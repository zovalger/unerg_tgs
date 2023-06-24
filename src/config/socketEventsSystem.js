const socketEventsSystem = {
	// estandar
	disconnect: "disconnect",

	// personalizados

	updatePosBus: "/bus/update/coord",
	updateCapacityBus: "/bus/update/capacity",
	sendChats: "send/chats",
	loadMessages: "load/messages",
	sendMessage: "send/message",
	reciveMessage: "recive/message",
};

export default socketEventsSystem;
