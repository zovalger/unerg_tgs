const { createContext, useState } = require("react");

const WaypointContext = createContext();

// ****************************************************************************
// 			este es un contexto que se utilizara para darles datos al mapa
// ****************************************************************************

export const WaypointProvider = ({ children }) => {
	const [waypoints, setWaypoints] = useState([]);

	const insert = (w)=>{
		// si no hay datos no hacer nada
		if (!w) return;

		// ver si es un array para reemplazar el array
		if (w instanceof Array) return setWaypoints(w);

		// si no es un array se inserta junto con los demas datos
		if (!w.coord?.lat || !w.coord?.lat) return;

		console.log(w.coord);
		setWaypoints([...waypoints, w]);
	}


	return (
		<WaypointContext.Provider
			value={{
				waypoints,
				setWaypoints,
				insert
			}}
		>
			{children}
		</WaypointContext.Provider>
	);
};

export default WaypointContext;
