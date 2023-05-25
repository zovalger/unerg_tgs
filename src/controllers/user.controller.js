import { SECRET_WORD } from "@/config";
import ErrorsMessages from "@/config/errorsMessages";
import {
	createUserDriver_service,
	createUser_service,
	loginUser_service,
} from "@/services/user.service";
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

export async function loginUser_controller(req, res) {
	try {
		const { email, password } = req.body;

		console.log(email, password);

		const user = await loginUser_service({ email, password });

		if (!user)
			return res.status(404).json({
				auth: false,
				error: { message: "usuario o contraseña invalido" },
			});

		// expire in 30 days
		const optionToken = {
			...JSON.parse(JSON.stringify(user)),
			exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
		};

		const token = sign(optionToken, SECRET_WORD);

		const serialized = serialize("authCookie", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: true,
			maxAge: 1000 * 60 * 60 * 24 * 30,
			path: "/",
		});

		res.setHeader("Set-Cookie", serialized);

		return res.status(200).json({
			auth: true,
			message: "Login successful",
		});
	} catch (error) {
		console.log(error);
	}
}

export async function logoutUser_controller(req, res) {
	const { authCookie } = req.cookies;

	console.log("logout");

	if (!authCookie)
		return res.status(401).json({ error: { message: "no token" } });

	try {
		const serialized = serialize("authCookie", null, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: true,
			maxAge: 0,
			path: "/",
		});

		res.setHeader("Set-Cookie", serialized);

		return res.status(200).json({
			auth: false,
			success: true,
			message: "Logout successful",
		});
	} catch (error) {
		console.log(error);
	}
}

export async function profileUser_controller(req, res) {
	const { authCookie } = req.cookies;

	if (!authCookie)
		return res.status(401).json({ error: { message: "no token" } });

	try {
		const user = verify(authCookie, SECRET_WORD);
		return res.status(200).json(user);
	} catch (error) {
		console.log(error);
	}
}
