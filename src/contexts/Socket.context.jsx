import io from "socket.io-client";
import MapContext from "./Map.context";

const { createContext, useState, useEffect, useContext } = require("react");

const SocketContext = createContext();

// ****************************************************************************
// 									sockets de normales del usuario
// ****************************************************************************

export const SocketProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [io_instance, setIo] = useState(io);
	const { updateBus } = useContext(MapContext);

	useEffect(() => {
		socketInitializer();
	}, []);

	const socketInitializer = async () => {
		await fetch("/api/socket");

		let socket = io();

		setSocket(socket);

		socket.on("connect", () => {
			console.log("connected");
		});

		socket.on("/bus/update/coord", (busData) => {
			console.log(busData);
			updateBus(busData);
		});

		// const onChangeHandler = (e) => {
		// 	setInput(e.target.value);
		// 	socket.emit("input-change", e.target.value);
		// };
	};

	const resetSocket = () => {
		socket.close()
		socketInitializer();
	};

	return (
		<SocketContext.Provider value={{ resetSocket, socket, io_instance }}>
			{children}
		</SocketContext.Provider>
	);
};

export default SocketContext;
