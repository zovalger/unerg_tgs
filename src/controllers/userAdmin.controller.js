import { SECRET_WORD } from "@/config";
import ErrorsMessages from "@/config/errorsMessages";
import {
	createUserAdmin_service,
	getAllUserAdmin_service,
	getUserAdmin_service,
	updateUserAdmin_service,
} from "@/services/userAdmin.service";

import { adminUserValidatorSchema } from "@/validations/adminUser.validation";
import { serialize } from "cookie";
import { sign, verify } from "jsonwebtoken";

export async function registerUserAdmin_controller(req, res) {
	// obtencion de datos de la request
	const { name, CI, birthdate, address, phone, email, perfilImg, permissions } =
		req.body;

	const data = {
		name,
		CI,
		birthdate,
		address,
		phone,
		email,
		perfilImg,
		permissions,
	};

	try {
		// validacion de datos
		await adminUserValidatorSchema.validate(data);
	} catch (error) {
		// si existe un error en los datos se le envia al cliente
		console.log(error);
		return res.status(400).json({ error, message: error.errors });
	}

	try {
		// Formateado de datos
		const formateData = adminUserValidatorSchema.cast(data);

		// creacion del waypoint
		const user = await createUserAdmin_service(formateData);

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

export async function updateUserAdmin_controller(req, res) {
	const { _id } = req.query;

	// obtencion de datos de la request
	const { name, CI, birthdate, address, phone, email, perfilImg, permissions } =
		req.body;

	const data = {
		name,
		CI,
		birthdate,
		address,
		phone,
		email,
		perfilImg,
		permissions,
	};

	try {
		// validacion de datos
		await adminUserValidatorSchema.validate(data);
	} catch (error) {
		// si existe un error en los datos se le envia al cliente
		console.log(error);
		return res.status(400).json({ error, message: error.errors });
	}

	try {
		// Formateado de datos
		const formateData = adminUserValidatorSchema.cast(data);

		// creacion del waypoint
		const user = await updateUserAdmin_service(_id, formateData);

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

export const getAllUserAdmins_controller = async (req, res) => {
	try {
		// obtencion de todos los timetable con status "a" en la DB
		const admin = await getAllUserAdmin_service();

		// si la funcion no devuelve nada se devuelve un error al cliente
		if (!admin)
			return res
				.status(500)
				.json({ error: true, message: ErrorsMessages.notFound });

		// si la funcion devuelve algun error se le enviara al cliente
		if (admin.error) return res.status(500).json(admin);

		return res.status(200).json(admin);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error: true, message: ErrorsMessages.inServer });
	}
};

export const getUserAdmin_by_Id_controller = async (req, res) => {
	const { _id } = req.query;

	try {
		// se timetableca en la DB
		const admin = await getUserAdmin_service(_id);

		// si no devuelve nada se envia un error 404
		if (!admin)
			return res
				.status(404)
				.json({ error: true, message: ErrorsMessages.notFound });

		// si la funcion devuelve algun error se le enviara al cliente
		if (admin.error) return res.status(500).json(admin);

		return res.status(200).json(admin);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error: true, message: ErrorsMessages.inServer });
	}
};
