import socketEventsSystem from "@/config/socketEventsSystem";
import dbConnect from "@/lib/db";
import { updateCoordBus_service } from "@/services/bus.service";

export const driverSocketController = (io, socket, user) => {
	if (!user) return;
	if (user.role != "driver") return;

	// *****************************************************************
	// 								actualizacion de posicion de bus
	// *****************************************************************

	socket.on(socketEventsSystem.updatePosBus, async (coord) => {
		await dbConnect();

		const bus = await updateCoordBus_service(user.busId, coord);
		console.log(`bus: ${bus.num}; updatePos: ${JSON.stringify(bus.coord)}`);

		socket.broadcast.emit(socketEventsSystem.updatePosBus, bus);
	});

	// *****************************************************************
	// 								actualizacion de posicion de bus
	// *****************************************************************
};
