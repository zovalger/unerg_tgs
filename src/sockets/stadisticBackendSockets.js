import socketEventsSystem from "@/config/socketEventsSystem";
import dbConnect from "@/lib/db";
import { addCountUser, subtracCountUser } from "@/services/stadistic.service";

export const stadisticSocketController = async (io, socket, user) => {
	await dbConnect();

    console.log("sumando");

	addCountUser(socket.id, user);

	// modificar

	socket.on(socketEventsSystem.disconnect, async () => {
		console.log("restando");
		subtracCountUser(socket.id);
	});
};
