import ErrorsMessages from "@/config/errorsMessages";

import BusModel from "@/models/Bus.model";
import { sign } from "jsonwebtoken";

// ********************************************************************
// 								buses: Creacion en la DB
// ********************************************************************

export const createBus_service = async (data) => {
	// obtencion de datos necesarios
	const { num, placa, ruta } = data;

	try {
		// todo: buscar con registro anterior

		const oldPlaca = await BusModel.findOne({ placa });
		const oldNum = await BusModel.findOne({ num });

		if (oldPlaca)
			return {
				error: true,
				message: `Ya hay un bus con la placa ${placa} y tiene el numero: ${oldPlaca.num}`,
			};

		if (oldNum)
			return {
				error: true,
				message: `Ya hay un bus con el numero ${num} y tiene la placa: ${oldNum.placa}`,
			};

		// creacion de una instancia del modelo
		const bus = new BusModel({
			num,
			placa,
			ruta,
		});

		// guardado y devolucion de datos
		await bus.save();

		return bus;
	} catch (error) {
		console.log(error);
	}
};

// ********************************************************************
// 				buses: obtencion de todos los que estan en la DB
// ********************************************************************

export const getAllActiveBusesWithRuta_service = async () => {
	try {
		// obtencion de los bus con estatus activo
		// y ordenado alfabeticamente
		const buses = await BusModel.find({ status: { $ne: "d" } })
			.sort({
				num: 1,
			})
			.populate("ruta");

		// devolucion de la consulta
		return buses;
	} catch (error) {
		console.log(error);
	}
};

export const getAllActiveBuses_service = async () => {
	try {
		// obtencion de los bus con estatus activo
		// y ordenado alfabeticamente
		const buses = await BusModel.find({ status: { $ne: "d" } }).sort({
			num: 1,
		});

		// devolucion de la consulta
		return buses;
	} catch (error) {
		console.log(error);
	}
};

// ********************************************************************
// 									buses: obtencion por ID
// ********************************************************************

export const getBus_by_Id_service = async (_id = null) => {
	// si no se proporciona id no se hace nada
	if (!_id) return;

	try {
		// busqueda del bus en la DB
		const bus = await BusModel.findById(_id);

		// devolucion de la consulta
		return bus;
	} catch (error) {
		console.log(error);
	}
};

// ********************************************************************
// 									buses: obtencion por ID
// ********************************************************************

export const getBuses_By_RutaId_service = async (_id = null) => {
	// si no se proporciona id no se hace nada
	if (!_id) return;

	try {
		// busqueda del bus en la DB
		const buses = await BusModel.find({ ruta: _id });

		// devolucion de la consulta
		return buses;
	} catch (error) {
		console.log(error);
	}
};

// ********************************************************************
// 									buses: obtencion por ID
// ********************************************************************

// se utilizara para obtener los bus referenciados en una ruta

export const getBuses_by_Ids_service = async (_ids = null) => {
	try {
		// se itera cada id para ver si es un texto
		// si no lo es se tira un error
		_ids.map((id) => {
			if (typeof id.toString() !== "string")
				throw new Error(`${id} no es un formato correcto de _id`);
		});

		// se consulta en la DB por todos los bus
		// y se ordenan segun el array de ids proporcionado
		const buses = await BusModel.find({ _id: { $in: _ids } }, (err, docs) => {
			if (err) {
				console.log(err);
			} else {
				// ordenar los documentos según el orden de los _ids
				const sortedDocs = ids.map((id) =>
					docs.find((doc) => doc._id.toString() === id)
				);
				console.log(sortedDocs);
			}
		});

		// se devuelven los buses quitando los no obtenidos de la DB
		return buses.filter((w) => w !== undefined);
	} catch (error) {
		console.log(error);
	}
};

// export const IsThatsBusCreated_service = async(_ids);

// ********************************************************************
// 								buses: obtencion por nombre
// ********************************************************************
// se busca el nombre del bus en la DB
// se pueden buscar los que tambien esten marcado como eliminado

export const getBuses_by_Name_service = async (
	name = null,
	includeDelete = false
) => {
	try {
	} catch (error) {
		console.log(error);
	}
};

// ********************************************************************
// 				buses: obtencion de todas las placas registradas
// ********************************************************************
// se devolvera un array de objetos con _id y placa del bus correspondiente

export const getAllPlacas_service = async () => {
	try {
		const placas = await BusModel.find({}, { _id: 1, placa: 1 });

		return placas;
	} catch (error) {
		console.log(error);
	}
};

// ********************************************************************
// 				buses: obtencion de todas las placas registradas
// ********************************************************************
// se devolvera un array de objetos con _id y numero del bus correspondiente

export const getAllNum_service = async () => {
	try {
		const nums = await BusModel.find({}, { _id: 1, num: 1 });

		return nums;
	} catch (error) {
		console.log(error);
	}
};

// ********************************************************************
// 								buses: modificacion de datos
// ********************************************************************

export const updateBus_service = async (_id, data) => {
	if (!_id) return;

	// obtencion de los datos modificables
	const { num, placa, ruta } = data;
	const newData = { num, placa, ruta };

	try {
		const oldPlaca = await BusModel.findOne({ placa });
		const oldNum = await BusModel.findOne({ num });

		if (oldPlaca)
			if (oldPlaca._id.toString() != _id)
				return {
					error: true,
					message: `Ya hay un bus con la placa ${placa} y tiene el numero: ${oldPlaca.num}`,
				};

		if (oldNum)
			if (oldNum._id.toString() != _id)
				return {
					error: true,
					message: `Ya hay un bus con el numero ${num} y tiene la placa: ${oldNum.placa}`,
				};

		await BusModel.findByIdAndUpdate(_id, newData);

		// consulta en la DB por el bus
		const bus = await BusModel.findById(_id).populate("ruta");

		// si no se encuentra se devuelve un error de no encontrado
		if (!bus) return { error: true, message: ErrorsMessages.notFound };

		// devolucion exitosa
		return bus;
	} catch (error) {
		console.log(error);
	}
};

// ********************************************************************
// 							buses: update coords
// ********************************************************************

export const updateCoordBus_service = async (_id, coord) => {
	if (!_id) return;

	// obtencion de los datos modificables
	const { lat, lng } = coord;
	const newData = { coord: { lat, lng } };

	try {
		await BusModel.findByIdAndUpdate(_id, newData);

		const bus = await BusModel.findById(_id);

		// si no se encuentra se devuelve un error de no encontrado
		if (!bus) return { error: true, message: ErrorsMessages.notFound };

		// devolucion exitosa
		return bus;
	} catch (error) {
		console.log(error);
	}
};

// ********************************************************************
// 							buses: update coords
// ********************************************************************

export const updateCapacityBus_service = async (_id, capacity) => {
	if (!_id) return;

	// obtencion de los datos modificables

	const newData = { capacity };

	try {
		await BusModel.findByIdAndUpdate(_id, newData);

		const bus = await BusModel.findById(_id);

		// si no se encuentra se devuelve un error de no encontrado
		if (!bus) return { error: true, message: ErrorsMessages.notFound };

		// devolucion exitosa
		return bus;
	} catch (error) {
		console.log(error);
	}
};

// ********************************************************************
// 	 buses: intercambiar el status entre eliminado o no eliminado
// ********************************************************************

export const toggleBus_service = async (_id) => {
	if (!_id) return;

	try {
		// se busca el bus con el id
		const bus = await BusModel.findById(_id);

		// si no se encuentra se devuelve un error de no encontrado
		if (!bus) return { error: true, message: ErrorsMessages.notFound };

		// se intercambia el status
		bus.status = bus.status === "a" ? "d" : "a";

		// guadar los cambios
		await bus.save();

		return bus;
	} catch (error) {
		console.log(error);
	}
};
