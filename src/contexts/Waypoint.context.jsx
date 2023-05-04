const { createContext, useState } = require("react");

const WaypointContext = createContext();

// ****************************************************************************
// 			este es un contexto que se utilizara para darles datos al mapa
// ****************************************************************************

export const WaypointProvider = ({ children }) => {
	const [waypoints, setWaypoints] = useState([]);

	return (
		<WaypointContext.Provider
			value={{
				waypoints,
				setWaypoints,
			}}
		>
			{children}
		</WaypointContext.Provider>
	);
};

export default WaypointContext;
