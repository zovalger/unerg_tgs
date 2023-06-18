import { getRuta_By_BusId_Request } from "@/api/ruta.api";
import {
	finishBusTravelDriver_Request,
	startBusTravelDriver_Request,
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

	// ***********************************************************
	// 							guardado en el localstorage
	// ***********************************************************
	const getRecordTravel = () =>
		JSON.parse(localStorage.getItem("busTravel")) || {};

	const setRecorTravel = (busTravel) =>
		localStorage.setItem("busTravel", JSON.stringify(busTravel));

	// ***********************************************************
	// 			ver la distancia entre los waypoint de la ruta
	// ***********************************************************

	const verificDistanceWaypoint = (coord, busTravel) => {
		let pivot = parseInt(localStorage.getItem("pivotWaypoint"));

		if (pivot >= ourRuta.waypoints.length) return;

		let nextPivot = pivot;
		const visitados = busTravel.waypointsVisited;
		const currentCoord = { latitude: coord.lat, longitude: coord.lng };

		// verificar que no nos pasemos del maximo de waypoints de la ruta
		const pivotTarget = pivot + 2;
		const sobrante = ourRuta.waypoints.length - 1 - pivotTarget;
		const maxPivot = sobrante <= -1 ? pivotTarget + sobrante : pivotTarget;

		console.log("pivote:", pivot, "target:", maxPivot, "sobrante:", sobrante);
		for (let i = pivot; i <= maxPivot; i++) {
			const w = ourRuta.waypoints[i];
			const nextCoord = { latitude: w.coord.lat, longitude: w.coord.lng };
			const distance = haversine(currentCoord, nextCoord, { unit: "meter" });

			console.log(distance);

			// guardar en visited si esta menos de la distancia
			if (distance <= 50) {
				console.log(distance <= 50);

				visitados.push(w._id);
				nextPivot = i + 1;
			}
		}
		console.log(nextPivot);

		localStorage.setItem("pivotWaypoint", nextPivot);

		return visitados;
	};

	// ***********************************************************
	// 	guardar coordenadas y/o finalizar e iniciar nuevamente el busTravel
	// ***********************************************************

	const saveCoordInBusTravel = async (coord) => {
		const busTravel = getRecordTravel();
		const { waypoints } = busTravel;

		const waypointsVisited = verificDistanceWaypoint(coord, busTravel);
		// todo: ver si ya se culmino
		if (waypointsVisited) busTravel.waypointsVisited = waypointsVisited;

		busTravel.waypoints = [...waypoints, { coord, date: new Date() }];
		setRecorTravel(busTravel);

		let pivot = parseInt(localStorage.getItem("pivotWaypoint"));

		if (pivot >= ourRuta.waypoints.length) {
			try {
				const { data: finishBusTravel } = await finishBusTravelDriver_Request(
					user._id,
					busTravel
				);
			} catch (error) {}

			try {
				const { data: newBustravel } = await startBusTravelDriver_Request(
					user._id
				);
				setRecorTravel(newBustravel);
				localStorage.setItem("pivotWaypoint", 0);
			} catch (error) {
				console.log(error);
			}
		}

		// todo: enviar culminacion de la ruta
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

				localStorage.setItem("pivotWaypoint", 0);

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

	// todo: que se envie la vuelta que se estaba haciendo
	// todo: no enviar si tiene de 0 a 2 waypoint visitados
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
