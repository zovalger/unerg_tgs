export const chatSocketController = (io, socket) => {

    socket.on('Send Message', (data) => {
        console.log(data);
 
    });
};