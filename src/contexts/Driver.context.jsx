import { login_Request, logout_Request, profile_Request } from "@/api/auth.api";
import { useRouter } from "next/router";
import MapContext from "./Map.context";
import SocketContext from "./Socket.context";
import UserContext from "./User.context";

const { createContext, useState, useEffect, useContext } = require("react");

const DriverContext = createContext();

// ****************************************************************************
// 									datos y autenticacion del usuario
// ****************************************************************************

export const DriverProvider = ({ children }) => {
	const { socket } = useContext(SocketContext);

	useEffect(() => {
		if (!socket) return;
		driverInitializer();
	}, [socket]);

	const driverInitializer = async () => {
		// socket.on("update-input", (msg) => {
		// 	console.log("hola que hace");
		// 	setInput(msg);
		// });
	};

	const sendCoord = (coord) => {
		if (!coord) return;

		socket.emit("/bus/update/coord", coord);
	};

	// ############# Chat Sockets ###################

	const sendMessage = (message) => {
		socket.emit('Send Message', message);
	};

	return (
		<DriverContext.Provider value={{ sendCoord, sendMessage }}>
			{children}
		</DriverContext.Provider>
	);
};

export default DriverContext;
