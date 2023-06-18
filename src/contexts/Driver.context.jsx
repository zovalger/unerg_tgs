import { getRuta_By_BusId_Request } from "@/api/ruta.api";
import {
	startInServiceDriver_Request,
	stopInServiceDriver_Request,
} from "@/api/userDriver.api";
import socketEventsSystem from "@/config/socketEventsSystem";
import SocketContext from "./Socket.context";
import ToastContext from "./Toast.context";
import UserContext from "./User.context";
import haversine from "haversine";

import { createContext, useState, useEffect, useContext } from "react";
import MapContext from "./Map.context";

const DriverContext = createContext();

// ****************************************************************************
// 									datos y autenticacion del usuario
// ****************************************************************************

export const DriverProvider = ({ children }) => {
	const { socket } = useContext(SocketContext);
	const { user, setUser } = useContext(UserContext);
	const { withLoadingSuccessAndErrorFuntionsToast } = useContext(ToastContext);
	const { insertRuta, insertWaypoint } = useContext(MapContext);
	const [intervalService, setIntervalService] = useState(null);

	const [ourRuta, setOurRuta] = useState(null);
	const [pivot, setPivot] = useState(0);

	useEffect(() => {
		if (!socket) return;
		driverInitializer();
	}, [socket]);

	useEffect(() => {
		if (user)
			if (user.role == "driver")
				getRuta_By_BusId_Request(user.busId).then(({ data }) => {
					console.log(data);
					setOurRuta(data);
					insertRuta([data]);
					insertWaypoint(data.waypoints);
				});
	}, [user]);

	const getRecordTravel = () =>
		JSON.parse(localStorage.getItem("busTravel")) || {};

	const setRecorTravel = (busTravel) =>
		localStorage.setItem("busTravel", JSON.stringify(busTravel));

	const verificDistanceWaypoint = (coord, busTravel) => {
		const visitedes = busTravel.waypointsVisited;

		const currentCoord = { latitude: coord.lat, longitude: coord.lng };


		for (let i = pivot+1; i <= pivot + 3; i++) {
			const w = ourRuta.waypoints[i];
			const nextCoord = { latitude: w.coord.lat, longitude: w.coord.lng };
			const distance = haversine(currentCoord, nextCoord, { unit: "meter" });

			console.log(distance);
			console.log(distance <= 50);
			// guardar en visited si esta menos de la distancia
			
		}

		//{
		//	latitude: 27.950575,
		//	longitude: -82.457178
		//	}

		return;
	};
	const saveCoordInBusTravel = (coord) => {
		const busTravel = getRecordTravel();
		const { waypoints } = busTravel;

		const waypointsVisited = verificDistanceWaypoint(coord, busTravel);
		if (waypointsVisited) busTravel.waypointsVisited = waypointsVisited;

		busTravel.waypoints = [...waypoints, { coord, date: new Date() }];

		setRecorTravel(busTravel);
	};

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
				setRecorTravel(data.busTravel);
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
			stopInServiceDriver_Request(user._id, getRecordTravel()),
			({ data }) => {
				//	console.log(data);
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

	// informacion de la vuelta del autobus

	// *******************************************************
	// 									Sockets
	// *******************************************************

	const sendCoord_by_socket = (coord) => {
		if (!coord) return;
		if (!socket) return;

		console.log(coord);

		socket.volatile.emit(socketEventsSystem.updatePosBus, coord);
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

				ourRuta,
				saveCoordInBusTravel,
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
