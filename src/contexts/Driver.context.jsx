import { login_Request, logout_Request, profile_Request } from "@/api/auth.api";
import socketEventsSystem from "@/config/socketEventsSystem";
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
	const [Send, setSend] = useState(second)

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

		socket.emit(socketEventsSystem.updatePosBus, coord);
	};

	return (
		<DriverContext.Provider value={{ sendCoord }}>
			{children}
		</DriverContext.Provider>
	);
};

export default DriverContext;
