import ErrorsMessages from "@/config/errorsMessages";
import RutaModel from "@/models/Ruta.model";
import WaypointModel from "@/models/Waypoint.model";
import { sign } from "jsonwebtoken";

// ********************************************************************
// 								waypoints: Creacion en la DB
// ********************************************************************

export const createWaypoint_service = async (data) => {
	// obtencion de datos necesarios
	const { name, description, type, coord } = data;

	try {
		// creacion de una instancia del modelo
		const waypoint = new WaypointModel({
			name,
			description,
			type,
			coord,
		});

		// guardado y devolucion de datos
		await waypoint.save();

		return waypoint;
	} catch (error) {
		console.log(error);
	}
};

// ********************************************************************
// 				waypoints: obtencion de todos los que estan en la DB
// ********************************************************************

export const getAllActiveWaypoints_service = async () => {
	try {
		// obtencion de los waypoint con estatus activo
		// y ordenado alfabeticamente
		const waypoints = await WaypointModel.find({ status: { $ne: "d" } }).sort({
			name: 1,
		});

		// devolucion de la consulta
		return waypoints;
	} catch (error) {
		console.log(error);
	}
};

// ********************************************************************
// 									waypoints: obtencion por ID
// ********************************************************************

export const getWaypoint_by_Id_service = async (_id = null) => {
	// si no se proporciona id no se hace nada
	if (!_id) return;

	try {
		// busqueda del waypoint en la DB
		const waypoint = await WaypointModel.findById(_id);

		// devolucion de la consulta
		return waypoint;
	} catch (error) {
		console.log(error);
	}
};

// ********************************************************************
// 									waypoints: obtencion por ID
// ********************************************************************

// se utilizara para obtener los waypoint referenciados en una ruta

export const getWaypoints_by_Ids_service = async (_ids = null) => {
	try {
		// se itera cada id para ver si es un texto
		// si no lo es se tira un error
		_ids.map((id) => {
			if (typeof id.toString() !== "string")
				throw new Error(`${id} no es un formato correcto de _id`);
		});

		// se consulta en la DB por todos los waypoint
		// y se ordenan segun el array de ids proporcionado
		const waypoints = await WaypointModel.find(
			{ _id: { $in: _ids } },
			(err, docs) => {
				if (err) {
					console.log(err);
				} else {
					// ordenar los documentos según el orden de los _ids
					const sortedDocs = ids.map((id) =>
						docs.find((doc) => doc._id.toString() === id)
					);
				}
			}
		);

		// se devuelven los waypoints quitando los no obtenidos de la DB
		return waypoints.filter((w) => w !== undefined);
	} catch (error) {
		console.log(error);
	}
};

// export const IsThatsWaypointCreated_service = async(_ids);

// ********************************************************************
// 								waypoints: obtencion por nombre
// ********************************************************************
// se busca el nombre del waypoint en la DB
// se pueden buscar los que tambien esten marcado como eliminado

export const getWaypoints_by_Name_service = async (
	name = null,
	includeDelete = false
) => {
	try {
	} catch (error) {
		console.log(error);
	}
};

// ********************************************************************
// 								waypoints: modificacion de datos
// ********************************************************************

export const updateWaypoint_service = async (_id, data) => {
	// obtencion de los datos modificables
	const { name, description, type, coord } = data;
	const newData = { name, description, type, coord };

	try {
		await WaypointModel.findByIdAndUpdate(_id, newData);

		// consulta en la DB por el waypoint
		const waypoint = await WaypointModel.findById(_id);

		// si no se encuentra se devuelve un error de no encontrado
		if (!waypoint) return { error: true, message: ErrorsMessages.notFound };

		// se actualizan los datos del waypoint
		// await waypoint.update(newData);

		// devolucion exitosa
		return waypoint;
	} catch (error) {
		console.log(error);
	}
};

// ********************************************************************
// 							waypoints: creacion o actualizacion
// ********************************************************************
// se utilizara cuando una ruta envie datos de un waypoint que
// sea nuevo o que ya este creado, para actualizar sus datos

export const createOrUpdateWapoint_service = async (data) => {
	try {
		// si el objeto tiene un id se actualiza, sino se crea
		const waypoint = data._id
			? await updateWaypoint_service(data.id, data)
			: await createWaypoint_service(data);

		return waypoint;
	} catch (error) {
		console.log(error);
	}
};

// ********************************************************************
// 	 waypoints: intercambiar el status entre eliminado o no eliminado
// ********************************************************************

export const toggleWaypoint_service = async (_id) => {
	try {
		// se busca el waypoint con el id
		const waypoint = await WaypointModel.findById(_id);

		// si no se encuentra se devuelve un error de no encontrado
		if (!waypoint) return { error: true, message: ErrorsMessages.notFound };

		const ruta = await RutaModel.findOne({
			waypoints: { $in: [waypoint._id] },
		});

		// si ese waypoint esta en una ruta no se elimina
		if (ruta && waypoint.status === "a")
			return {
				error: true,
				message: "La parada forma parte de almenos una ruta",
			};

		// se intercambia el status
		waypoint.status = waypoint.status === "a" ? "d" : "a";

		// guadar los cambios
		await waypoint.save();

		return waypoint;
	} catch (error) {
		console.log(error);
	}
};
