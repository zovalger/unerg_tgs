import ErrorsMessages from "@/config/errorsMessages";
import {
	createTimetable_service,
	toggleTimetable_service,
	getTimetable_by_Id_service,
	updateTimetable_service,
	getAllTimetables_service,
	getAllDriverTimetables_service,
	getAllRutaTimetables_service,
} from "@/services/timetable.service";
import { timetableValidatorSchema } from "@/validations/timetable.validation";

// ********************************************************************
// 									timetables: Creacion
// ********************************************************************

export const createTimetable_controller = async (req, res) => {
	// obtencion de datos de la request
	const { name, startTime, endTime, workDays, type,description } = req.body;
	const timetableData = { name, startTime, endTime, workDays, type ,description};

	try {
		// validacion de datos
		await timetableValidatorSchema.validate(timetableData);
	} catch (error) {
		// si existe un error en los datos se le envia al cliente
		console.log(error);
		return res.status(400).json({ error, message: error.errors });
	}

	try {
		// Formateado de datos
		const formateData = timetableValidatorSchema.cast(timetableData);

		// creacion del timetable
		const timetable = await createTimetable_service(formateData);

		// si no se creo se le envia un error 500
		if (!timetable)
			return res
				.status(500)
				.json({ error: true, message: ErrorsMessages.inServer });

		// si la funcion devuelve algun error se le enviara al cliente
		if (timetable.error) return res.status(500).json(timetable);

		// se devuelve el timetable exitosamente
		return res.status(200).json(timetable);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error: true, message: ErrorsMessages.inServer });
	}
};

// ********************************************************************
// 					timetables: obtencion de todos con status "a"
// ********************************************************************

export const getAllTimetables_controller = async (req, res) => {
	try {
		// obtencion de todos los timetable con status "a" en la DB
		const timetables = await getAllTimetables_service();

		// si la funcion no devuelve nada se devuelve un error al cliente
		if (!timetables)
			return res
				.status(500)
				.json({ error: true, message: ErrorsMessages.inServer });

		// si la funcion devuelve algun error se le enviara al cliente
		if (timetables.error) return res.status(500).json(timetables);

		return res.status(200).json(timetables);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error: true, message: ErrorsMessages.inServer });
	}
};

// ********************************************************************
// 					timetables: obtencion de todos type: "d"
// ********************************************************************

export const getAllDriverTimetables_controller = async (req, res) => {
	try {
		// obtencion de todos los timetable con status "a" en la DB
		const timetables = await getAllDriverTimetables_service();

		// si la funcion no devuelve nada se devuelve un error al cliente
		if (!timetables)
			return res
				.status(500)
				.json({ error: true, message: ErrorsMessages.inServer });

		// si la funcion devuelve algun error se le enviara al cliente
		if (timetables.error) return res.status(500).json(timetables);

		return res.status(200).json(timetables);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error: true, message: ErrorsMessages.inServer });
	}
};

// ********************************************************************
// 					timetables: obtencion de todos con type: "r"
// ********************************************************************

export const getAllRutaTimetables_controller = async (req, res) => {
	try {
		// obtencion de todos los timetable con status "a" en la DB
		const timetables = await getAllRutaTimetables_service();

		// si la funcion no devuelve nada se devuelve un error al cliente
		if (!timetables)
			return res
				.status(500)
				.json({ error: true, message: ErrorsMessages.inServer });

		// si la funcion devuelve algun error se le enviara al cliente
		if (timetables.error) return res.status(500).json(timetables);

		return res.status(200).json(timetables);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error: true, message: ErrorsMessages.inServer });
	}
};

// ********************************************************************
// 								timetables: obtencion por ID
// ********************************************************************

export const getTimetable_By_Id_controller = async (req, res) => {
	// se obtiene el id solicitado
	const { _id } = req.query;

	try {
		// se timetableca en la DB
		const timetable = await getTimetable_by_Id_service(_id);

		// si no devuelve nada se envia un error 404
		if (!timetable)
			return res
				.status(404)
				.json({ error: true, message: ErrorsMessages.notFound });

		// si la funcion devuelve algun error se le enviara al cliente
		if (timetable.error) return res.status(500).json(timetable);

		return res.status(200).json(timetable);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error: true, message: ErrorsMessages.inServer });
	}
};

// ********************************************************************
// 						timetables: Actualizacion de datos de un timetable
// ********************************************************************

export const updateTimetable_controller = async (req, res) => {
	// se obtinen los datos de la request
	const { _id } = req.query;
	const { name, startTime, endTime, workDays, type,description } = req.body;

	const timetableData = { name, startTime, endTime, workDays, type,description };

	try {
		// validacion de datos
		await timetableValidatorSchema.validate(timetableData);
	} catch (error) {
		// si existe un error en los datos se le envia al cliente
		console.log(error);
		return res.status(400).json({ error: error.errors });
	}

	try {
		// Formateado de datos
		const formateData = timetableValidatorSchema.cast(timetableData);

		// modificacion del timetable
		const timetable = await updateTimetable_service(_id, formateData);

		// si no devuelve nada hubo un error en el servidor
		if (!timetable)
			return res
				.status(500)
				.json({ error: true, message: ErrorsMessages.inServer });

		// si la funcion devuelve algun error se le enviara al cliente
		if (timetable.error) return res.status(500).json(timetable);

		// se devuelve el timetable modificado exitosamente
		return res.status(200).json(timetable);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error: true, message: ErrorsMessages.inServer });
	}
};

// ********************************************************************
// 	 timetables: intercambiar el status entre eliminado o no eliminado
// ********************************************************************

export const toggleStatusTimetable_controller = async (req, res) => {
	// se obtinen los datos de la request
	const { _id } = req.query;

	try {
		// intercambio del estatus
		const timetable = await toggleTimetable_service(_id);

		// si no devuelve nada hubo un error en el servidor
		if (!timetable)
			return res
				.status(500)
				.json({ error: true, message: ErrorsMessages.inServer });

		// si la funcion devuelve algun error se le enviara al cliente
		if (timetable.error) return res.status(500).json(timetable);

		// se devuelve el timetable exitosamente
		return res.status(200).json(timetable);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error: true, message: ErrorsMessages.inServer });
	}
};
