import { SECRET_WORD } from "@/config";
import ErrorsMessages from "@/config/errorsMessages";

import { driverUserValidatorSchema } from "@/validations/driverUser.validation";
import { serialize } from "cookie";
import { sign, verify } from "jsonwebtoken";

export async function registerUserDriver_controller(req, res) {
	// obtencion de datos de la request
	const {
		name,
		lastname,
		CI,
		birthdate,
		address,
		bloodType,
		phone,
		emergencyPhone,
		email,
		busId,
		timetableId,
	} = req.body;

	const data = {
		name,
		lastname,
		CI,
		birthdate,
		address,
		bloodType,
		phone,
		emergencyPhone,
		email,
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
