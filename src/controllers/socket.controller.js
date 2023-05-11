// import { driverSocketService } from "@/services/driver.socket.service";

import { SECRET_WORD } from "@/config";
import BusModel from "@/models/Bus.model";
import { getAllActiveWaypoints_service } from "@/services/waypoint.service";
import { parse } from "cookie";
import { verify } from "jsonwebtoken";
import { Server } from "socket.io";

export const socketInit = (req, res) => {
	if (res.socket.server.io) {
		console.log("Socket is already running");
	} else {
		console.log("Socket is initializing");
		const io = new Server(res.socket.server);
		res.socket.server.io = io;

		io.on("connection", (socket) => {
			const { authCookie } = parse(socket.request.headers.cookie || "");
			// driverSocketService(socket,io)
			let user = null;

			try {
				if (authCookie) {
					user = verify(authCookie, SECRET_WORD);
					console.log("usuario registrado");

					console.log(user);
				}
			} catch (error) {
				console.log(error);
			}

			if (user) {
				socket.on("/bus/update/coord", async (coord) => {
					console.log(await getAllActiveWaypoints_service());

					socket.broadcast.emit("/bus/update/coord", {
						_id: "1",
						coord,
						name: "bus dinamico",
					});
					console.log(coord);
				});
			}

			// todo: colocar disconect
		});
	}
	res.end();
};
