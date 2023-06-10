import { SECRET_WORD } from "@/config";
import ErrorsMessages from "@/config/errorsMessages";
import {
	createUserDriver_service,
	getAllUserDriver_by_BusId_service,
	getAllUserDriver_service,
	getUserDriver_service,
	updateUserDriver_service,
} from "@/services/userDriver.service";

import { driverUserValidatorSchema } from "@/validations/driverUser.validation";
import { serialize } from "cookie";
import { sign, verify } from "jsonwebtoken";

export async function registerUserDriver_controller(req, res) {
	// obtencion de datos de la request
	const {
		name,
		CI,
		birthdate,
		address,
		bloodType,
		phone,
		emergencyPhone,
		email,
		perfilImg,
		busId,
		timetableId,
	} = req.body;

	const data = {
		name,
		CI,
		birthdate,
		address,
		bloodType,
		phone,
		emergencyPhone,
		email,
		perfilImg,
		busId,
		timetableId,
	};

	try {
		// validacion de datos
		await driverUserValidatorSchema.validate(data);
	} catch (error) {
		// si existe un error en los datos se le envia al cliente
		console.log(error);
		return res.status(400).json({ error, message: error.errors });
	}

	try {
		// Formateado de datos
		const formateData = driverUserValidatorSchema.cast(data);

		// creacion del waypoint
		const user = await createUserDriver_service(formateData);

		// si no se creo se le envia un error 500
		if (!user)
			return res.status(500).json({
				error: true,
				message: `${ErrorsMessages.inServer}: no se creo el usuario`,
			});

		// si la funcion devuelve algun error se le enviara al cliente
		if (user.error) return res.status(500).json(user);

		// se devuelve el waypoint exitosamente
		return res.status(200).json(user);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error: true, message: ErrorsMessages.inServer });
	}
}

export async function updateUserDriver_controller(req, res) {
	const { _id } = req.query;

	// obtencion de datos de la request
	const {
		name,

		CI,
		birthdate,
		address,
		bloodType,
		phone,
		emergencyPhone,
		email,
		busId,
		perfilImg,
		timetableId,
	} = req.body;

	const data = {
		name,

		CI,
		birthdate,
		address,
		bloodType,
		phone,
		emergencyPhone,
		email,
		busId,
		perfilImg,
		timetableId,
	};

	try {
		// validacion de datos
		await driverUserValidatorSchema.validate(data);
	} catch (error) {
		// si existe un error en los datos se le envia al cliente
		console.log(error);
		return res.status(400).json({ error, message: error.errors });
	}

	try {
		// Formateado de datos
		const formateData = driverUserValidatorSchema.cast(data);

		// creacion del waypoint
		const user = await updateUserDriver_service(_id, formateData);

		// si no se creo se le envia un error 500
		if (!user)
			return res
				.status(500)
				.json({ error: true, message: ErrorsMessages.inServer });

		// si la funcion devuelve algun error se le enviara al cliente
		if (user.error) return res.status(500).json(user);

		// se devuelve el waypoint exitosamente
		return res.status(200).json(user);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error: true, message: ErrorsMessages.inServer });
	}
}

export const getAllUserDrivers_controller = async (req, res) => {
	try {
		// obtencion de todos los timetable con status "a" en la DB
		const driver = await getAllUserDriver_service();

		// si la funcion no devuelve nada se devuelve un error al cliente
		if (!driver)
			return res
				.status(500)
				.json({ error: true, message: ErrorsMessages.notFound });

		// si la funcion devuelve algun error se le enviara al cliente
		if (driver.error) return res.status(500).json(driver);

		return res.status(200).json(driver);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error: true, message: ErrorsMessages.inServer });
	}
};

export const getUserDriver_by_Id_controller = async (req, res) => {
	const { _id } = req.query;

	try {
		// se timetableca en la DB
		const driver = await getUserDriver_service(_id);

		// si no devuelve nada se envia un error 404
		if (!driver)
			return res
				.status(404)
				.json({ error: true, message: ErrorsMessages.notFound });

		// si la funcion devuelve algun error se le enviara al cliente
		if (driver.error) return res.status(500).json(driver);

		return res.status(200).json(driver);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error: true, message: ErrorsMessages.inServer });
	}
};


export const getUserDriver_by_BusId_controller = async (req, res) => {
	const { _id } = req.query;

	try {
		// se timetableca en la DB
		const driver = await getAllUserDriver_by_BusId_service(_id);

		// si no devuelve nada se envia un error 404
		if (!driver)
			return res
				.status(404)
				.json({ error: true, message: ErrorsMessages.notFound });

		// si la funcion devuelve algun error se le enviara al cliente
		if (driver.error) return res.status(500).json(driver);

		return res.status(200).json(driver);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error: true, message: ErrorsMessages.inServer });
	}
};