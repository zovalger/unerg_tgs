const { createContext, useState } = require("react");

const ToasterContext = createContext();

// ****************************************************************************
// 									para usar notificaciones de toast
// ****************************************************************************

export const ToasterProvider = ({ children }) => {
	return (
		<ToasterContext.Provider value={{}}>{children}</ToasterContext.Provider>
	);
};

export default ToasterContext;
