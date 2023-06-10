import ErrorsMessages from "@/config/errorsMessages";
import {
	createBus_service,
	toggleBus_service,
	getAllActiveBusesWithRuta_service,
	getBus_by_Id_service,
	updateBus_service,
	getAllPlacas_service,
	getAllNum_service,
	getBuses_By_RutaId_service,
} from "@/services/bus.service";
import { busValidatorSchema } from "@/validations/bus.validation";

// ********************************************************************
// 									buses: Creacion
// ********************************************************************

export const createBus_controller = async (req, res) => {
	// obtencion de datos de la request
	const { num, placa, ruta } = req.body;
	const busData = { num, placa, ruta };

	try {
		// validacion de datos
		await busValidatorSchema.validate(busData);
	} catch (error) {
		// si existe un error en los datos se le envia al cliente
		console.log(error);
		return res.status(400).json({ error, message: error.errors });
	}

	try {
		// Formateado de datos
		const formateData = busValidatorSchema.cast(busData);

		// creacion del bus
		const bus = await createBus_service(formateData);

		// si no se creo se le envia un error 500
		if (!bus)
			return res
				.status(500)
				.json({ error: true, message: ErrorsMessages.inServer });

		// si la funcion devuelve algun error se le enviara al cliente
		if (bus.error) return res.status(500).json(bus);

		// se devuelve el bus exitosamente
		return res.status(200).json(bus);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error: true, message: ErrorsMessages.inServer });
	}
};

// ********************************************************************
// 					buses: obtencion de todos con status "a"
// ********************************************************************

export const getAllActiveBuses_controller = async (req, res) => {
	try {
		// obtencion de todos los bus con status "a" en la DB
		const buses = await getAllActiveBusesWithRuta_service();

		// si la funcion no devuelve nada se devuelve un error al cliente
		if (!buses)
			return res
				.status(500)
				.json({ error: true, message: ErrorsMessages.inServer });

		// si la funcion devuelve algun error se le enviara al cliente
		if (buses.error) return res.status(500).json(buses);

		// si no se obtienen datos de la DB se devuelve un status 404
		if (buses.length <= 0)
			return res.status(404).json({ error: true, message: "No hay paradas" });

		return res.status(200).json(buses);
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

export const getBus_By_Id_controller = async (req, res) => {
	// se obtiene el id solicitado
	const { _id } = req.query;

	try {
		// se busca en la DB
		const bus = await getBus_by_Id_service(_id);

		// si no devuelve nada se envia un error 404
		if (!bus)
			return res
				.status(404)
				.json({ error: true, message: "Bus no encontrado" });

		// si la funcion devuelve algun error se le enviara al cliente
		if (bus.error) return res.status(500).json(bus);

		return res.status(200).json(bus);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error: true, message: ErrorsMessages.inServer });
	}
};


export const getBus_By_RutaId_controller = async (req, res) => {
	// se obtiene el id solicitado
	const { _id } = req.query;

	try {
		// se busca en la DB
		const buses = await getBuses_By_RutaId_service(_id);

		// si no devuelve nada se envia un error 404
		if (!buses)
			return res
				.status(404)
				.json({ error: true, message: ErrorsMessages.noData });

		// si la funcion devuelve algun error se le enviara al cliente
		if (buses.error) return res.status(500).json(buses);

		return res.status(200).json(buses);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error: true, message: ErrorsMessages.inServer });
	}
};


// ********************************************************************
// 								buses: obtencion por busqueda (numero o placa)
// ********************************************************************

// export const getBus_By_Search_controller= async (req, res)=>{

// }

// ********************************************************************
// 					buses: obtener todas las placas registradas
// ********************************************************************

export const getAllPlacas_controller = async (req, res) => {
	// se obtiene el id solicitado

	try {
		// se busca en la DB
		const placas = await getAllPlacas_service();

		// si no devuelve nada se envia un error 404
		if (!placas)
			return res
				.status(500)
				.json({ error: true, message: ErrorsMessages.inServer });

		// si la funcion devuelve algun error se le enviara al cliente
		if (placas.error) return res.status(500).json(placas);

		if (placas.length <= 0)
			return res
				.status(404)
				.json({ error: true, message: ErrorsMessages.noData });

		return res.status(200).json(placas);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error: true, message: ErrorsMessages.inServer });
	}
};

// ********************************************************************
// 					buses: obtener todas las placas registradas
// ********************************************************************

export const getAllNum_controller = async (req, res) => {
	// se obtiene el id solicitado

	try {
		// se busca en la DB
		const nums = await getAllNum_service();

		// si no devuelve nada se envia un error 404
		if (!nums)
			return res
				.status(500)
				.json({ error: true, message: ErrorsMessages.inServer });

		// si la funcion devuelve algun error se le enviara al cliente
		if (nums.error) return res.status(500).json(nums);

		if (nums.length <= 0)
			return res
				.status(404)
				.json({ error: true, message: ErrorsMessages.noData });

		return res.status(200).json(nums);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error: true, message: ErrorsMessages.inServer });
	}
};

// ********************************************************************
// 						buses: Actualizacion de datos de un bus
// ********************************************************************

export const updateBus_controller = async (req, res) => {
	// se obtinen los datos de la request
	const { _id } = req.query;
	const { num, placa, ruta } = req.body;

	const busData = { num, placa, ruta };

	try {
		// validacion de datos
		await busValidatorSchema.validate(busData);
	} catch (error) {
		// si existe un error en los datos se le envia al cliente
		console.log(error);
		return res.status(400).json({ error: error.errors });
	}

	try {
		// Formateado de datos
		const formateData = busValidatorSchema.cast(busData);

		// modificacion del bus
		const bus = await updateBus_service(_id, formateData);

		// si no devuelve nada hubo un error en el servidor
		if (!bus)
			return res
				.status(500)
				.json({ error: true, message: ErrorsMessages.inServer });

		// si la funcion devuelve algun error se le enviara al cliente
		if (bus.error) return res.status(500).json(bus);

		// se devuelve el bus modificado exitosamente
		return res.status(200).json(bus);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error: true, message: ErrorsMessages.inServer });
	}
};

// ********************************************************************
// 	 buses: intercambiar el status entre eliminado o no eliminado
// ********************************************************************

export const toggleStatusBus_controller = async (req, res) => {
	// se obtinen los datos de la request
	const { _id } = req.query;

	try {
		// intercambio del estatus
		const bus = await toggleBus_service(_id);

		// si no devuelve nada hubo un error en el servidor
		if (!bus)
			return res
				.status(500)
				.json({ error: true, message: ErrorsMessages.inServer });

		// si la funcion devuelve algun error se le enviara al cliente
		if (bus.error) return res.status(500).json(bus);

		// se devuelve el bus exitosamente
		return res.status(200).json(bus);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error: true, message: ErrorsMessages.inServer });
	}
};
