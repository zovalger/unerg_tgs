const { createContext } = require("react");

const MapContext = createContext();

export const MapProvider = ({ children }) => {
	const test = () => {
		console.log("hola mundo contexto");
	};

	return (
		<MapContext.Provider
			value={{
				test,
			}}
		>
			{children}
		</MapContext.Provider>
	);
};

export default MapContext;
