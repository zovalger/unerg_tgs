import socketEventsSystem from "@/config/socketEventsSystem";
import dbConnect from "@/lib/db";
import {
	updateCapacityBus_service,
	updateCoordBus_service,
} from "@/services/bus.service";
import { updateBustravelWaypoints_service } from "@/services/busTravel.service";

export const driverSocketController = (io, socket, user) => {
	if (!user) return;
	if (user.role != "driver") return;

	// *****************************************************************
	// 									Bus: update Coords
	// *****************************************************************

	socket.on(socketEventsSystem.updatePosBus, async (coord) => {
		await dbConnect();

		const bus = await updateCoordBus_service(user.busId, coord);

		// await updateBustravelWaypoints_service(user._id, coord);

		console.log(
			user.name,
			user.busId,
			`bus: ${bus.num}; ${bus._id} updatePos: ${JSON.stringify(bus.coord)}`
		);

		socket.broadcast.emit(socketEventsSystem.updatePosBus, bus);
	});

	// *****************************************************************
	// 									Bus: update Capacity
	// *****************************************************************

	socket.on(socketEventsSystem.updateCapacityBus, async (capacity) => {
		await dbConnect();

		const bus = await updateCapacityBus_service(user.busId, capacity);
		console.log(`bus: ${bus.num}; updateCapacity: ${capacity}`);

		socket.broadcast.emit(socketEventsSystem.updateCapacityBus, bus);
	});
};
