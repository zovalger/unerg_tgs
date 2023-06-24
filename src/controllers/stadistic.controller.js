import ErrorsMessages from "@/config/errorsMessages";
import { getStadisticIndexation_service } from "@/services/stadistic.service";
import {
	createWaypoint_service,
	toggleWaypoint_service,
	getAllActiveWaypoints_service,
	getWaypoint_by_Id_service,
	updateWaypoint_service,
} from "@/services/waypoint.service";
import { waypointValidatorSchema } from "@/validations/waypoint.validation";

// ********************************************************************
// 									waypoints: Creacion
// ********************************************************************

export const getStadisticIndexation_controller = async (req, res) => {
	try {
		// creacion del waypoint
		const data = await getStadisticIndexation_service();

		// si no se creo se le envia un error 500
		if (!data)
			return res
				.status(500)
				.json({ error: true, message: ErrorsMessages.inServer });

		// si la funcion devuelve algun error se le enviara al cliente
		if (data.error) return res.status(500).json(data);

		// se devuelve el waypoint exitosamente
		return res.status(200).json(data);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error: true, message: ErrorsMessages.inServer });
	}
};

// ********************************************************************
// 					waypoints: obtencion de todos con status "a"
// ********************************************************************

export const getAllActiveWaypoints_controller = async (req, res) => {
	try {
		// obtencion de todos los waypoint con status "a" en la DB
		const waypoints = await getAllActiveWaypoints_service();

		// si la funcion no devuelve nada se devuelve un error al cliente
		if (!waypoints)
			return res
				.status(500)
				.json({ error: true, message: ErrorsMessages.inServer });

		// si la funcion devuelve algun error se le enviara al cliente
		if (waypoints.error) return res.status(500).json(waypoints);

		// si no se obtienen datos de la DB se devuelve un status 404
		if (waypoints.length <= 0)
			return res.status(404).json({ error: true, message: "No hay paradas" });

		return res.status(200).json(waypoints);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error: true, message: ErrorsMessages.inServer });
	}
};

// ********************************************************************
// 								waypoints: obtencion por ID
// ********************************************************************

export const getWaypoint_By_Id_controller = async (req, res) => {
	// se obtiene el id solicitado
	const { _id } = req.query;

	try {
		// se busca en la DB
		const waypoint = await getWaypoint_by_Id_service(_id);

		// si no devuelve nada se envia un error 404
		if (!waypoint)
			return res
				.status(404)
				.json({ error: true, message: "Parada no encontrada" });

		// si la funcion devuelve algun error se le enviara al cliente
		if (waypoint.error) return res.status(500).json(waypoint);

		return res.status(200).json(waypoint);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error: true, message: ErrorsMessages.inServer });
	}
};

// ********************************************************************
// 								waypoints: obtencion por busqueda
// ********************************************************************

// export const getWaypoint_By_Search_controller= async (req, res)=>{

// }

// ********************************************************************
// 						waypoints: Actualizacion de datos de un waypoint
// ********************************************************************

export const updateWaypoint_controller = async (req, res) => {
	// se obtinen los datos de la request
	const { _id } = req.query;
	const { name, description, type, coord } = req.body;

	const waypointData = { name, description, type, coord };

	try {
		// validacion de datos
		await waypointValidatorSchema.validate(waypointData);
	} catch (error) {
		// si existe un error en los datos se le envia al cliente
		console.log(error);
		return res.status(400).json({ error: error.errors });
	}

	try {
		// Formateado de datos
		const formateData = waypointValidatorSchema.cast(waypointData);

		// modificacion del waypoint
		const waypoint = await updateWaypoint_service(_id, formateData);

		// si no devuelve nada hubo un error en el servidor
		if (!waypoint)
			return res
				.status(500)
				.json({ error: true, message: ErrorsMessages.inServer });

		// si la funcion devuelve algun error se le enviara al cliente
		if (waypoint.error) return res.status(500).json(waypoint);

		// se devuelve el waypoint modificado exitosamente
		return res.status(200).json(waypoint);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error: true, message: ErrorsMessages.inServer });
	}
};

// ********************************************************************
// 	 waypoints: intercambiar el status entre eliminado o no eliminado
// ********************************************************************

export const toggleStatusWaypoint_controller = async (req, res) => {
	// se obtinen los datos de la request
	const { _id } = req.query;

	try {
		// intercambio del estatus
		const waypoint = await toggleWaypoint_service(_id);

		// si no devuelve nada hubo un error en el servidor
		if (!waypoint)
			return res
				.status(500)
				.json({ error: true, message: ErrorsMessages.inServer });

		// si la funcion devuelve algun error se le enviara al cliente
		if (waypoint.error) return res.status(500).json(waypoint);

		// se devuelve el waypoint exitosamente
		return res.status(200).json(waypoint);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error: true, message: ErrorsMessages.inServer });
	}
};
