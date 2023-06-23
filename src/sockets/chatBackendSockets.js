import socketEventsSystem from "@/config/socketEventsSystem";
import dbConnect from "@/lib/db";

import { getAllChats_service, getChatsByDriverId_service } from "@/services/chats.service";

export const chatSocketController = (io, socket, user) => {

    roomsUserJoin(io, socket, user)
    
    socket.on(socketEventsSystem.sendMessage, async (message) => {
        message.isSent = false
        console.log(message);
        socket.to(message.chatId).emit(socketEventsSystem.reciveMessage, message);
    });
};

export const roomsUserJoin = async (io, socket, user) => {
    if (!user) return;
    await dbConnect();
    if (user.role === "driver") {
        const chat = await getChatsByDriverId_service(user._id);
        if (!chat) return;
        socket.join(chat._id.toString());
        socket.emit(socketEventsSystem.sendChats, chat)   
    } else if (user.role === "admin" || user.role === "root") {
        const chats = await getAllChats_service();
        if (!chats) return;
        chats.forEach((chat) => {
            socket.join(chat._id.toString());
        });
        socket.emit(socketEventsSystem.sendChats, chats)
    };
    console.log(io.sockets.adapter.rooms);
};