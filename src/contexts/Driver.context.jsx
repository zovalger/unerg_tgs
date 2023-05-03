import { login_Request, logout_Request, profile_Request } from "@/api/auth.api";
import { useRouter } from "next/router";
import MapContext from "./MapContext";
import SocketContext from "./Socket.context";
import UserContext from "./UserProvider";

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

	return (
		<DriverContext.Provider value={{ sendCoord }}>
			{children}
		</DriverContext.Provider>
	);
};

export default DriverContext;
