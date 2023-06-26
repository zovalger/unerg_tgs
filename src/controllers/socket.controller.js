// import { driverSocketService } from "@/services/driver.socket.service";

import { SECRET_WORD } from "@/config";
import socketEventsSystem from "@/config/socketEventsSystem";
import BusModel from "@/models/Bus.model";
import { getAllActiveWaypoints_service } from "@/services/waypoint.service";
import { parse } from "cookie";
import { verify } from "jsonwebtoken";
import { Server } from "socket.io";
import { chatSocketController } from "@/sockets/chatBackendSockets.js";
import { driverSocketController } from "@/sockets/driverBackendSockets";
import dbConnect from "@/lib/db";
import DriverModel from "@/models/Driver.model";
import { stadisticSocketController } from "@/sockets/stadisticBackendSockets";

export const socketInit = (req, res) => {
	if (res.socket.server.io) {
		console.log("Socket is already running");
	} else {
		console.log("Socket is initializing");
		const io = new Server(res.socket.server);
		res.socket.server.io = io;

		io.on("connection", async (socket) => {
			const { authCookie } = parse(socket.request.headers.cookie || "");
			let user = null;

			try {
				if (authCookie) user = verify(authCookie, SECRET_WORD);
			} catch (error) {
				console.log(error);
			}

			console.log(user);

			// eventos especificos de los conductores
			driverSocketController(io, socket, user);
			chatSocketController(io, socket, user);

			await stadisticSocketController(io, socket, user);

			// todo: colocar disconect
			socket.on(socketEventsSystem.disconnect, () => {
				console.log("user disconnected", "socket:", socket.id);
			});
		});
	}
	res.end();
};
