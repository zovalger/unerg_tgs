const { createContext, useState } = require("react");

const WaypointContext = createContext();

// ****************************************************************************
// 			este es un contexto que se utilizara para darles datos al mapa
// ****************************************************************************

export const WaypointProvider = ({ children }) => {
	const [waypoints, setWaypoints] = useState([]);

	const insert = (w) => {
		// si no hay datos no hacer nada
		if (!w) return;

		// ver si es un array para reemplazar el array
		if (w instanceof Array) return setWaypoints(w);

		// si no es un array se inserta junto con los demas datos
		if (!w.coord?.lat || !w.coord?.lat) return;

		console.log(w.coord);
		setWaypoints([...waypoints, w]);
	};

	const getWaypoint = (_id) => {
		return waypoints.find((item) => item._id == _id);
	};

	const updateWaypoint = (_id, data) => {
		const i = waypoints.findIndex((item) => item._id == _id);

		if (i < 0) return insert(data);

		const newSet = waypoints.map((item) => (item._id == _id ? data : item));
		setWaypoints(newSet);

		return newSet;
	};

	const dropWaypoint = (_id) => {
		const newSet = waypoints.filter((item) => {
			if (item._id != _id) return item;
		});

		setWaypoints(newSet);
		return newSet;
	};

	return (
		<WaypointContext.Provider
			value={{
				waypoints,
				setWaypoints,
				insert,
				getWaypoint,
				updateWaypoint,
				dropWaypoint
			}}
		>
			{children}
		</WaypointContext.Provider>
	);
};

export default WaypointContext;