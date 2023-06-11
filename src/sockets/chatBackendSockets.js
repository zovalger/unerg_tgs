import socketEventsSystem from "@/config/socketEventsSystem";

export const chatSocketController = (io, socket) => {

    socket.on(socketEventsSystem.sendMessage, (data) => {
        data = "recivido: " + data;
        console.log(data);
        socket.broadcast.emit( socketEventsSystem.reciveMessage, data);
    });
};