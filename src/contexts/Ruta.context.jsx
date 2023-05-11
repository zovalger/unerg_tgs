import { getAllRutas_Request } from "@/api/ruta.api";

const { createContext, useState, useEffect } = require("react");

const RutaContext = createContext();

// ****************************************************************************
// 			este es un contexto que se utilizara para darles datos al mapa
// ****************************************************************************

export const RutaProvider = ({ children }) => {
	const [rutas, setRuta] = useState([]);
	const [editingRoute, setEditingRoute] = useState(null);

	useEffect(() => {
		getAllRutas_Request()
			.then((res) => insertRuta(res.data))
			.catch((error) => console.log(error));
	}, []);

	const insertRuta = (r) => {
		// si no hay datos no hacer nada
		if (!r) return;

		// ver si es un array para reemplazar el array
		if (r instanceof Array) return setRuta(r);

		setRuta([...rutas, r]);
	};

	const getRuta = (_id) => {
		return rutas.find((item) => item._id == _id);
	};

	const updateRuta = (_id, data) => {
		const i = rutas.findIndex((item) => item._id == _id);

		if (i < 0) return insertRuta(data);

		const newSet = rutas.map((item) => (item._id == _id ? data : item));
		setRuta(newSet);

		return newSet;
	};

	const dropRuta = (_id) => {
		const newSet = rutas.filter((item) => item._id != _id);

		setRuta(newSet);
		return newSet;
	};

	return (
		<RutaContext.Provider
			value={{
				rutas,
				setRuta,
				insertRuta,
				getRuta,
				updateRuta,
				dropRuta,

				// ruta que se esta editando
				editingRoute,
				setEditingRoute,
			}}
		>
			{children}
		</RutaContext.Provider>
	);
};

export default RutaContext;
