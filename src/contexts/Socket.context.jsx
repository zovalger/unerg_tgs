import socketEventsSystem from "@/config/socketEventsSystem";
import io from "socket.io-client";
import BusContext from "./Bus.context";
import MapContext from "./Map.context";

const { createContext, useState, useEffect, useContext } = require("react");

const SocketContext = createContext();

// ****************************************************************************
// 									sockets de normales del usuario
// ****************************************************************************

export const SocketProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [io_instance, setIo] = useState(io);
	const [eventSubscribe, setEventSubscribe] = useState([]);

	useEffect(() => {
		if (socket) return;
		socketInitializer();
	}, [socket]);

	const socketInitializer = async () => {
		await fetch("/api/socket");

		let socket = io();

		setSocket(socket);

		defaultListeners(socket);
	};

	// *************************************************************
	// 					listeners predeterminados del socket
	// *************************************************************

	const defaultListeners = (socket) => {
		if (!socket) return;

		socket.on("connect", () => {
			console.log("connected");
		});

		// notificaciones
	};

	const offDefaultListeners = () => {};

	const resetSocket = () => {
		if (socket) socket.disconnect();
		socketInitializer();
	};

	return (
		<SocketContext.Provider value={{ resetSocket, socket, io_instance }}>
			{children}
		</SocketContext.Provider>
	);
};

export default SocketContext;
