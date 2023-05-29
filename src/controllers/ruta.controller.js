import {
	createRuta_service,
	// deleteRuta_service,
	getAllRutas_service,
	getRuta_by_Id_service,
	toggleRuta_service,
	updateRuta_service,
} from "@/services/ruta.service";

export const createRuta_controller = async (req, res) => {
	try {
		const { name, description, waypoints } = req.body;

		const ruta = await createRuta_service({
			name,
			description,
			waypoints,
			// idTimetable,
		});

		if (!ruta)
			return res
				.status(500)
				.json({ error: { message: "Error en el servidor" } });

		return res.status(200).json(ruta);
	} catch (error) {
		console.log(error);
	}
};

export const getAllRutas_controller = async (req, res) => {
	try {
		const rutas = await getAllRutas_service();

		if (!rutas)
			return res
				.status(500)
				.json({ error: { message: "Error en el servidor" } });

		if (rutas.length <= 0)
			return res.status(404).json({ error: { message: "No hay paradas" } });

		return res.status(200).json(rutas);
	} catch (error) {
		console.log(error);
	}
};

export const getRuta_By_Id_controller = async (req, res) => {
	try {
		const { _id } = req.query;

		const ruta = await getRuta_by_Id_service(_id);

		if (!ruta)
			return res
				.status(404)
				.json({ error: { message: "Parada no encontrada" } });

		return res.status(200).json(ruta);
	} catch (error) {
		console.log(error);
	}
};

export const updateRuta_controller = async (req, res) => {
	try {
		const { _id } = req.query;
		const { name, description, waypoints } = req.body;

		const ruta = await updateRuta_service(_id, {
			name,
			description,
			waypoints,
		});

		if (!ruta)
			return res
				.status(500)
				.json({ error: { message: "Error en el servidor" } });

		return res.status(200).json(ruta);
	} catch (error) {
		console.log(error);
	}
};

// export const deleteRuta_controller = async (req, res) => {
// 	try {
// 		const { _id } = req.query;

// const result = await deleteRuta_service(_id);

// 		if (!result)
// 		return	res.status(500).json({ error: { message: "Error en el servidor" } });

// 	return	res.status(200).json(result);
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

export const toggleStatusRuta_controller = async (req, res) => {
	// se obtinen los datos de la request
	const { _id } = req.query;

	try {
		// intercambio del estatus
		const ruta = await toggleRuta_service(_id);

		// si no devuelve nada hubo un error en el servidor
		if (!ruta)
			return res
				.status(500)
				.json({ error: true, message: ErrorsMessages.inServer });

		// si la funcion devuelve algun error se le enviara al cliente
		if (ruta.error) return res.status(500).json(ruta);

		// se devuelve el waypoint exitosamente
		return res.status(200).json(ruta);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error: true, message: ErrorsMessages.inServer });
	}
};
