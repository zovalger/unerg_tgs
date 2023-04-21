const { createContext, useState } = require("react");

const MapContext = createContext();

// ****************************************************************************
// 			este es un contexto que se utilizara para darles datos al mapa
// ****************************************************************************

export const MapProvider = ({ children }) => {
	const [map, setMap] = useState(null);

	const getCenterMap = () => {
		if (!map) return null;

		return map.getCenter();
	};

	const setCenterMap = (coord = null, zoom) => {
		if (!coord) return;

		if (!coord.lat || !coord.lng) return;

		if (!map) return null;

		return map.setView(coord, zoom);
	};

	// ****************************************************************************
	// 									 	waypoins: funcionalidades y estados
	// ****************************************************************************

	const [Waypoints, setWaypoints] = useState([
		{
			_id: "1",
			name: "parada 1",
			// description: "String",
			type: "p",
			state: "a",
			coord: { lat: 9.9030296, lng: -67.3761181 },
		},
		{
			_id: "2",
			name: "parada two",
			// description: "String",
			type: "p",
			state: "a",
			coord: { lat: 9.904, lng: -67.379 },
		},
	]);

	// insertar uno o varios waypoins
	//
	const insertWaypoint = (w = null) => {
		// si no hay datos no hacer nada
		if (!w) return;

		// ver si es un array para reemplazar el array
		if (w instanceof Array) return setWaypoints([w]);

		// si no es un array se inserta junto con los demas datos

		if (!w.coord?.lat || !w.coord?.lat) return;

		console.log(w.coord);
		setWaypoints([...Waypoints, w]);
	};

	// Para limpiar el arreglo de los waypoinst
	const clearWaypoint = () => setWaypoints([]);

	// ******************* Funcionabilidades de los buses *******************

	const [Buses, setBuses] = useState([
		{
			_id: "1",
			idRuta: "1",
			capacity: 0.5,
			state: "a",
			coord: { lat: 9.908, lng: -67.379 },
			name: "Bus 001",
			num: "000",
			placa: "ab00",
		},
		{
			_id: "2",
			idRuta: "2",
			capacity: 0.75,
			state: "a",
			coord: { lat: 9.91, lng: -67.385 },
			name: "Bus 003",
			num: "000",
			placa: "ab00",
		},
	]);

	const insertBus = (b = null) => {
		if (!b) return;

		if (b instanceof Array) return setBuses(b);

		setBuses([...Buses, b]);
	};

	const updateBus = (b) => {
		const index = Buses.findIndex((bus) => bus._id == b._id);

		if (index == -1) return insertBus(b);

		const newState = Buses.map((bus, i) => (i === index ? b : bus));

		insertBus(newState);
	};

	const clearBuses = () => setBuses([]);

	// ******************* Funcionabilidades de las rutas *******************

	const [Rutas, setRutas] = useState([
		// {
		// 	_id: "23",
		// 	name: "terminal centro",
		// 	description: "pequena descripsion de la ruta",
		// 	color: "#15f7f7",
		// 	state: "a",
		// 	waypoints: [
		// 		{ lat: 9.908, lng: -67.379 },
		// 		{ lat: 9.91, lng: -67.385 },
		// 	],
		// 	idTimetable: "objectId(Ruta_Timetable)",
		// },

		{
			_id: "24",
			name: "unerg centro",
			description: "pequena descripsion de la ruta",
			color: "#15f7f7",
			state: "a",
			waypoints: [
				{ lat: 9.904, lng: -67.379 },
				{ lat: 9.9030296, lng: -67.3761181 },
			],
			idTimetable: "objectId(Ruta_Timetable)",
		},
	]);

	const insertRuta = (r) => {
		if (!r) return;

		if (r instanceof Array) return setRutas(r);

		setRutas([...Rutas, r]);
	};

	const clearRutas = () => setRutas([]);

	// ***************************************************************
	// 							Funcionabilidades sobre el usuario
	// ***************************************************************
	const [viewUserCoord, setViewUserCoord] = useState(false);
	const [userCoord, setUserCoord] = useState({ lat: null, lng: null });

	// cambia si se ve o no el icono del usuario
	const toogleViewUserCoord = (v = null) =>
		setViewUserCoord(v != null ? v : !viewUserCoord);

	// obtine y devuelva las coordenadas del usuario y las asigna al estado
	const getCoordsUser = () => {
		const success = (pos) => {
			const {
				coords: { latitude: lat, longitude: lng },
			} = pos;

			if (!lat || !lng) return;

			const coord = { lat, lng };
			console.log(coord);

			setUserCoord(coord);
			setCenterMap(coord, 16);
		};

		const error = (error) => console.log(error);

		navigator.geolocation.getCurrentPosition(success, error, {
			enableHighAccuracy: true,
		});
	};

	return (
		<MapContext.Provider
			value={{
				// map
				map,
				setMap,
				getCenterMap,
				setCenterMap,

				// waypoins
				Waypoints,
				insertWaypoint,
				clearWaypoint,

				// buses
				Buses,
				insertBus,
				updateBus,
				clearBuses,

				// rutas
				Rutas,
				insertRuta,
				clearRutas,

				// user
				userCoord,
				viewUserCoord,
				toogleViewUserCoord,
				getCoordsUser,
			}}
		>
			{children}
		</MapContext.Provider>
	);
};

export default MapContext;
