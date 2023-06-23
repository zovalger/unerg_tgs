import ErrorsMessages from "@/config/errorsMessages";

import {
	createBusTravel_service,
	finishBusTravel_service,
} from "@/services/busTravel.service";
import { busValidatorSchema } from "@/validations/bus.validation";

// ********************************************************************
// 									buses: Creacion
// ********************************************************************

export const createBusTravel_controller = async (req, res) => {
	// obtencion de datos de la request
	const { _id } = req.query;

	try {
		// Formateado de datos

		// creacion del bus
		const busTravel = await createBusTravel_service(_id);

		// si no se creo se le envia un error 500
		if (!busTravel)
			return res
				.status(500)
				.json({ error: true, message: ErrorsMessages.inServer });

		// si la funcion devuelve algun error se le enviara al cliente
		if (busTravel.error) return res.status(500).json(busTravel);

		// se devuelve el bus exitosamente
		return res.status(200).json(busTravel);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error: true, message: ErrorsMessages.inServer });
	}
};

export const finishBusTravel_controller = async (req, res) => {
	// obtencion de datos de la request
	const { _id } = req.query;
	const travel = req.body;

	try {
		// Formateado de datos

		// creacion del bus
		const busTravel = await finishBusTravel_service(_id, travel);

		// si no se creo se le envia un error 500
		if (!busTravel)
			return res
				.status(500)
				.json({ error: true, message: ErrorsMessages.inServer });

		// si la funcion devuelve algun error se le enviara al cliente
		if (busTravel.error) return res.status(500).json(busTravel);

		// se devuelve el bus exitosamente
		return res.status(200).json(busTravel);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error: true, message: ErrorsMessages.inServer });
	}
};

// ********************************************************************
// 								buses: obtencion por ID
// ********************************************************************

// export const getBus_By_Id_controller = async (req, res) => {
// 	// se obtiene el id solicitado
// 	const { _id } = req.query;

// 	try {
// 		// se busca en la DB
// 		const bus = await getBus_by_Id_service(_id);

// 		// si no devuelve nada se envia un error 404
// 		if (!bus)
// 			return res
// 				.status(404)
// 				.json({ error: true, message: "Bus no encontrado" });

// 		// si la funcion devuelve algun error se le enviara al cliente
// 		if (bus.error) return res.status(500).json(bus);

// 		return res.status(200).json(bus);
// 	} catch (error) {
// 		console.log(error);
// 		return res
// 			.status(500)
// 			.json({ error: true, message: ErrorsMessages.inServer });
// 	}
// };

// ********************************************************************
// 						buses: Actualizacion de datos de un bus
// ********************************************************************

// export const updateBus_controller = async (req, res) => {
// 	// se obtinen los datos de la request
// 	const { _id } = req.query;
// 	const { num, placa, ruta } = req.body;

// 	const busData = { num, placa, ruta };

// 	try {
// 		// validacion de datos
// 		await busValidatorSchema.validate(busData);
// 	} catch (error) {
// 		// si existe un error en los datos se le envia al cliente
// 		console.log(error);
// 		return res.status(400).json({ error: error.errors });
// 	}

// 	try {
// 		// Formateado de datos
// 		const formateData = busValidatorSchema.cast(busData);

// 		// modificacion del bus
// 		const bus = await updateBus_service(_id, formateData);

// 		// si no devuelve nada hubo un error en el servidor
// 		if (!bus)
// 			return res
// 				.status(500)
// 				.json({ error: true, message: ErrorsMessages.inServer });

// 		// si la funcion devuelve algun error se le enviara al cliente
// 		if (bus.error) return res.status(500).json(bus);

// 		// se devuelve el bus modificado exitosamente
// 		return res.status(200).json(bus);
// 	} catch (error) {
// 		console.log(error);
// 		return res
// 			.status(500)
// 			.json({ error: true, message: ErrorsMessages.inServer });
// 	}
// };
