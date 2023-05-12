const { createContext, useState, useRef } = require("react");

const MapContext = createContext();

// ****************************************************************************
// 			este es un contexto que se utilizara para darles datos al mapa
// ****************************************************************************

export const MapProvider = ({ children }) => {
	const map = useRef(null);

	// obtiene las coordenadas del centro del mapa
	const getCenterMap = () => {
		if (!map.current) return null;

		return map.current.getCenter();
	};

	// se le dan coordenadas y zoom? para mover el mapa al punto especificado
	const setCenterMap = (coord = null, zoom = null) => {
		if (!map.current) return;
		if (!coord) return;
		if (!coord.lat || !coord.lng) return;
		if (typeof zoom !== "number" && zoom != null) return;

		return map.current.setView(coord, zoom);
	};

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
			const { coords } = pos;
			const { latitude: lat, longitude: lng } = coords;

			if (!lat || !lng)
				return console.log("no se obtuvieron las coordenadas del usuario");

			const formatedCoord = { lat, lng };
			console.log("coordenadas del usuario:", formatedCoord);

			setUserCoord(formatedCoord);
			setCenterMap(formatedCoord, 16);
		};

		const error = (error) =>
			console.log("no se obtuvieron las coordenadas del usuario", error);

		navigator.geolocation.getCurrentPosition(success, error, {
			enableHighAccuracy: true,
		});
	};

	// ****************************************************************************
	// 									 	waypoins: funcionalidades y estados
	// ****************************************************************************

	// los datos de todos los waypoins
	const [Waypoints, setWaypoints] = useState([]);

	// insertar uno o varios waypoins
	//
	const insertWaypoint = (w = null) => {
		// si no hay datos no hacer nada
		if (!w) return;

		// ver si es un array para reemplazar el array
		if (w instanceof Array) return setWaypoints(w);

		// si no es un array se inserta junto con los demas datos
		if (!w.coord?.lat || !w.coord?.lat) return;

		console.log(w.coord);
		setWaypoints([...Waypoints, w]);
	};

	// Para limpiar el arreglo de los waypoinst
	const clearWaypoint = () => setWaypoints([]);

	// ***************************************************************
	// 							 Funcionabilidades de los buses
	// ***************************************************************

	const [Buses, setBuses] = useState([
		// {
		// 	_id: "1",
		// 	idRuta: "1",
		// 	capacity: 0.5,
		// 	state: "a",
		// 	coord: { lat: 9.908, lng: -67.379 },
		// 	name: "Bus 001",
		// 	num: "000",
		// 	placa: "ab00",
		// },
	]);

	const insertBus = (b = null) => {
		if (!b) return;

		if (b instanceof Array) return setBuses(b);

		setBuses([...Buses, b]);
	};

	const updateBus = (newDataBus) => {
		const { _id } = newDataBus;
		if (!_id) return;

		const index = Buses.findIndex((bus) => newDataBus._id == bus._id);

		if (index == -1) return insertBus(newDataBus);

		const newGroup = Buses.map((bus, i) => (i === index ? newDataBus : bus));
		insertBus(newGroup);
	};

	const clearBuses = () => setBuses([]);
	// ***************************************************************
	//  							Funcionabilidades de las rutas
	// ***************************************************************

	const [Rutas, setRutas] = useState([
		{
			_id: "24",
			name: "unerg centro",
			description: "pequena descripsion de la ruta",
			color: "#15f7f7",
			state: "a",
			waypoints: [
				{ coord: { lat: 9.904, lng: -67.379 } },
				{ coord: { lat: 9.9030296, lng: -67.3761181 } },
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

	return (
		<MapContext.Provider
			value={{
				// map
				map,
				getCenterMap,
				setCenterMap,

				// user
				userCoord,
				viewUserCoord,
				toogleViewUserCoord,
				getCoordsUser,

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
			}}
		>
			{children}
		</MapContext.Provider>
	);
};

export default MapContext;
