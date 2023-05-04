const { createContext, useState } = require("react");

const RutaContext = createContext();

// ****************************************************************************
// 			este es un contexto que se utilizara para darles datos al mapa
// ****************************************************************************

export const RutaProvider = ({ children }) => {

	return (
		<RutaContext.Provider
			value={{
				// map
	
			}}
		>
			{children}
		</RutaContext.Provider>
	);
};

export default RutaContext;
