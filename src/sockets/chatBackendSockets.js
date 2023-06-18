import socketEventsSystem from "@/config/socketEventsSystem";
import dbConnect from "@/lib/db";

import { getAllChats_service, getChatsByDriverId_service } from "@/services/chats.service";

export const chatSocketController = (io, socket, user) => {

    roomsUserJoin(io, socket, user)
    
    socket.on(socketEventsSystem.sendMessage, async (message) => {
        message.text = "rresividod: " + message.text
        console.log(message);
        socket.to(message.chatId).emit(socketEventsSystem.reciveMessage, message);
    });
};

//TODO: borrar console logs y conseguir novia
export const roomsUserJoin = async (io, socket, user) => {
    if (!user) return;
    await dbConnect();
    if (user.role === "driver") {
        console.log(user._id);
        const chat = await getChatsByDriverId_service(user._id);
        console.log(chat);
        socket.join(chat._id.toString());
        socket.emit(socketEventsSystem.sendChats, chat)
        console.log(io.sockets.adapter.rooms);
    } else if (user.role === "admin" || user.role === "root") {
        console.log(user._id);
        const chats = await getAllChats_service();
        console.log(chats);
        chats.forEach((chat) => {
            socket.join(chat._id.toString());
        });
        socket.emit(socketEventsSystem.sendChats, chats)
        console.log(io.sockets.adapter.rooms);
    };
};