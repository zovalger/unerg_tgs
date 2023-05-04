import {
	createRuta_service,
	deleteRuta_service,
	getAllRutas_service,
	getRuta_by_Id_service,
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
			res.status(500).json({ error: { message: "Error en el servidor" } });

		res.status(200).json(ruta);
	} catch (error) {
		console.log(error);
	}
};

export const getAllRutas_controller = async (req, res) => {
	try {
		const rutas = await getAllRutas_service();

		if (!rutas)
			res.status(500).json({ error: { message: "Error en el servidor" } });

		if (rutas.length <= 0)
			res.status(404).json({ error: { message: "No hay paradas" } });

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
			res.status(404).json({ error: { message: "Parada no encontrada" } });

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
			res.status(500).json({ error: { message: "Error en el servidor" } });

		res.status(200).json(ruta);
	} catch (error) {
		console.log(error);
	}
};

export const deleteRuta_controller = async (req, res) => {
	try {
		const { _id } = req.query;

		const result = await deleteRuta_service(_id);
		console.log(result);

		if (!result)
			res.status(500).json({ error: { message: "Error en el servidor" } });

		res.status(200).json(result);
	} catch (error) {
		console.log(error);
	}
};
