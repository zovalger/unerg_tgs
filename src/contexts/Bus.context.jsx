import { getAllBuses_Request } from "@/api/public.api";
import socketEventsSystem from "@/config/socketEventsSystem";
import MapContext from "./Map.context";
import SocketContext from "./Socket.context";

const { createContext, useState, useEffect, useContext } = require("react");

const BusContext = createContext();

// ****************************************************************************
// 			este es un contexto que se utilizara para darles datos al mapa
// ****************************************************************************

export const BusProvider = ({ children }) => {
	const { socket } = useContext(SocketContext);

	const { updateBus: mapUpdateBus } = useContext(MapContext);

	const [buses, setBuses] = useState([]);

	useEffect(() => {
		refresh();
	}, []);

	useEffect(() => {
		if (!socket) return;
		socketInitializer();
	}, [socket]);

	const socketInitializer = async () => {
		// actualizacion de coordenadas
		socket.on(socketEventsSystem.updatePosBus, (busData) => {
			console.log(busData);
			updateBus(busData)
			mapUpdateBus(busData);
		});

		// actualizacion de capacidad
		socket.on(socketEventsSystem.updateCapacityBus, (busData) => {
			console.log(busData);
			updateBus(busData._id, busData);
		});
	};

	const refresh = () => {
		getAllBuses_Request()
			.then((res) => {
				console.log(res);
				insert(res.data);
			})
			.catch((error) => console.log(error));
	};
	const insert = (b) => {
		// si no hay datos no hacer nada
		if (!b) return;

		// ver si es un array para reemplazar el array
		if (b instanceof Array) return setBuses(b);

		setBuses([...buses, b]);
	};

	const getBus = (_id) => {
		console.log(buses);

		const b = buses.find((item) => item._id == _id);
		console.log(b);
		return b;
	};

	const getBuses_by_RutaId = (_id) =>
		buses.filter((b) =>
			b.ruta
				? typeof b.ruta === "string"
					? _id === b.ruta
						? true
						: false
					: b.ruta._id === _id
					? true
					: false
				: false
		);

	const updateBus = (_id, data) => {
		const i = buses.findIndex((item) => item._id == _id);

		if (i < 0) return insert(data);

		const newSet = buses.map((item) => (item._id == _id ? data : item));
		setBuses(newSet);

		return newSet;
	};

	const dropBus = (_id) => {
		const newSet = buses.filter((item) => item._id != _id);

		setBuses(newSet);
		return newSet;
	};

	return (
		<BusContext.Provider
			value={{
				buses,
				setBuses,
				insert,
				getBus,
				updateBus,
				dropBus,
				refresh,
				getBuses_by_RutaId,
			}}
		>
			{children}
		</BusContext.Provider>
	);
};

export default BusContext;
