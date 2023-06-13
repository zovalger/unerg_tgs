import socketEventsSystem from "@/config/socketEventsSystem";

export const chatSocketController = (io, socket) => {

    socket.on(socketEventsSystem.sendMessage, (data) => {
        data.text = "recivido: " + data.text;
        console.log(data);
        socket.broadcast.emit( socketEventsSystem.reciveMessage, data);
    });
};