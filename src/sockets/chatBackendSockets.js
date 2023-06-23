import socketEventsSystem from "@/config/socketEventsSystem";
import dbConnect from "@/lib/db";

import { 
    getAllChats_service, 
    getChatsByDriverId_service,
    saveNewMessage_service,
    getAllMessages_service,
} from "@/services/chats.service";

export const chatSocketController = (io, socket, user) => {

    roomsUserJoin(io, socket, user)
    
    socket.on(socketEventsSystem.sendMessage, async (message) => {
        message.isSent = false;
        console.log(message)
        saveNewMessage_service(message);
        socket.to(message.chatId).emit(socketEventsSystem.reciveMessage, message);
    });

    socket.on(socketEventsSystem.loadMessages, async () => {
        getAllMessages_service();
    });
};

//Funcion encargada de unir al usuario a las rooms de socket
export const roomsUserJoin = async (io, socket, user) => {
    if (!user) return;
    await dbConnect();

    //se determina el roll del usuario
    if (user.role === "driver") {
        
        //de ser conductor se trae unicamente su chat de la db
        const chat = await getChatsByDriverId_service(user._id);
        if (!chat) return;

        //se une a la room de socket y se envia el chat al front
        socket.join(chat._id.toString());
        socket.emit(socketEventsSystem.sendChats, chat);

    } else if (user.role === "admin" || user.role === "root") {

        //de ser admin o root se traen todos los chats
        const chats = await getAllChats_service();
        if (!chats) return;

        //se une a todas las rooms y se envian los chats al front
        chats.forEach((chat) => {
            socket.join(chat._id.toString());
        });
        socket.emit(socketEventsSystem.sendChats, chats)
    };
};