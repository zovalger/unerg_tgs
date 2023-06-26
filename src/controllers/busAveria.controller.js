import ErrorsMessages from "@/config/errorsMessages";

import {
	createBusAveria_service,
	finishBusAveria_service,
	getAllBusAverias_by_busId_service,
	updateBusAveria_service,
} from "@/services/busAveria.service";
import { busValidatorSchema } from "@/validations/bus.validation";

// ********************************************************************
// 									buses: Creacion
// ********************************************************************

export const createBusAveria_controller = async (req, res) => {
	// obtencion de datos de la request
	const data = req.body;
	const { _id } = req.query;

	try {
		// Formateado de datos

		// creacion del bus
		const busAveria = await createBusAveria_service({ ...data, bus: _id });

		// si no se creo se le envia un error 500
		if (!busAveria)
			return res
				.status(500)
				.json({ error: true, message: ErrorsMessages.inServer });

		// si la funcion devuelve algun error se le enviara al cliente
		if (busAveria.error) return res.status(500).json(busAveria);

		// se devuelve el bus exitosamente
		return res.status(200).json(busAveria);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error: true, message: ErrorsMessages.inServer });
	}
};

export const updateBusAveria_controller = async (req, res) => {
	// obtencion de datos de la request
	const { _id } = req.query;
	const data = req.body;

	try {
		// Formateado de datos

		// creacion del bus
		const busAveria = await updateBusAveria_service(_id, data);

		// si no se creo se le envia un error 500
		if (!busAveria)
			return res
				.status(500)
				.json({ error: true, message: ErrorsMessages.inServer });

		// si la funcion devuelve algun error se le enviara al cliente
		if (busAveria.error) return res.status(500).json(busAveria);

		// se devuelve el bus exitosamente
		return res.status(200).json(busAveria);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error: true, message: ErrorsMessages.inServer });
	}
};

export const getAllBusAveria_by_busId_controller = async (req, res) => {
	const { _id } = req.query;

	try {
		// Formateado de datos

		// creacion del bus
		const busAverias = await getAllBusAverias_by_busId_service(_id);

		// si no se creo se le envia un error 500
		if (!busAverias)
			return res
				.status(500)
				.json({ error: true, message: ErrorsMessages.inServer });

		// si la funcion devuelve algun error se le enviara al cliente
		if (busAverias.error) return res.status(500).json(busAverias);

		// se devuelve el bus exitosamente
		return res.status(200).json(busAverias);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error: true, message: ErrorsMessages.inServer });
	}
};
