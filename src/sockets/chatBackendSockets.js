import socketEventsSystem from "@/config/socketEventsSystem";
import dbConnect from "@/lib/db";

import { getAllChats_service } from "@/services/chats.service";

export const chatSocketController = (io, socket) => {

    socket.on(socketEventsSystem.chatConnection, async () => {
        await dbConnect();
        getAllChats_service();
    });

    socket.on(socketEventsSystem.sendMessage, (data) => {
        data.text = "resivido: " + data.text;
        console.log(data);
        socket.broadcast.emit( socketEventsSystem.reciveMessage, data);
    });
};