import { login_Request, logout_Request, profile_Request } from "@/api/auth.api";
import {
	startInServiceDriver_Request,
	stopInServiceDriver_Request,
} from "@/api/userDriver.api";
import socketEventsSystem from "@/config/socketEventsSystem";
import { useRouter } from "next/router";
import MapContext from "./Map.context";
import SocketContext from "./Socket.context";
import ToastContext from "./Toast.context";
import UserContext from "./User.context";

const { createContext, useState, useEffect, useContext } = require("react");

const DriverContext = createContext();

// ****************************************************************************
// 									datos y autenticacion del usuario
// ****************************************************************************

export const DriverProvider = ({ children }) => {
	const { socket } = useContext(SocketContext);
	const { user, setUser } = useContext(UserContext);
	const { withLoadingSuccessAndErrorFuntionsToast } = useContext(ToastContext);

	const [Send, setSend] = useState("");

	const [intervalService, setIntervalService] = useState(null);

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

	// asignar el interval para actualizar las coords
	const setServiceInterval = (iS) => {
		if (intervalService) return;
		setIntervalService(iS);
	};

	const clearIntervalService = () => {
		if (!intervalService) return;
		clearInterval(intervalService);
		setIntervalService(null);
	};

	// cambiar el inservice del usuario
	const startServiceDriver = () => {
		if (!user) return;

		withLoadingSuccessAndErrorFuntionsToast(
			startInServiceDriver_Request(user._id),
			({ data }) => {
				console.log(data);
				setUser({ ...user, inService: data.inService });
				return "Estas en servicio";
			},
			(error) => {
				console.log(error);
				const { error: err, message } = error.response.data;

				let msg = err ? message : error.message;

				return msg;
			}
		);
	};

	const endServiceDriver = () => {
		if (!user) return;

		withLoadingSuccessAndErrorFuntionsToast(
			stopInServiceDriver_Request(user._id),
			({ data }) => {
				console.log(data);
				setUser({ ...user, inService: data.inService });
				return "Saliste de servicio";
			},
			(error) => {
				console.log(error);

				const { error: err, message } = error.response.data;

				let msg = err ? message : error.message;

				return msg;
			}
		);
	};

	// *******************************************************
	// 									Sockets
	// *******************************************************

	const sendCoord_by_socket = (coord) => {
		if (!coord) return;
		if (!socket) return;

		console.log(coord);

		socket.emit(socketEventsSystem.updatePosBus, coord);
	};

	const sendCapacity_by_socket = (capacity) => {
		if (typeof capacity !== "number") return;
		if (!socket) return;

		console.log(capacity);

		socket.emit(socketEventsSystem.updateCapacityBus, capacity);
	};

	// ############# Chat Sockets ###################

	const sendMessage = (message) => {
		socket.emit(socketEventsSystem.sendMessage, message);
	};

	const reciveMessage = (message) => {
		socket.on(socketEventsSystem.reciveMessage, message);
		return () => {
			socket.off(socketEventsSystem.reciveMessage, message);
		};
	};

	return (
		<DriverContext.Provider
			value={{
				intervalService,
				startServiceDriver,
				endServiceDriver,
				setServiceInterval,
				clearIntervalService,

				sendCoord_by_socket,
				sendCapacity_by_socket,

				sendMessage,
				reciveMessage,
			}}
		>
			{children}
		</DriverContext.Provider>
	);
};

export default DriverContext;
