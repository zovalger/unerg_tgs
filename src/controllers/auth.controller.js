import { ROOT_USER, SECRET_WORD } from "@/config";

import ErrorsMessages from "@/config/errorsMessages";
import {
	authorizeSendUrlToChangePassword_service,
	getUser_By_Email,
	loginUser_service,
	setPasswordUser_service,
} from "@/services/auth.service";

import { driverUserValidatorSchema } from "@/validations/driverUser.validation";
import { serialize } from "cookie";
import { sign, verify } from "jsonwebtoken";

export const loginUser_controller = async (req, res) => {
	try {
		const { email, password } = req.body;

		console.log(email, password);

		const user = await loginUser_service({ email, password });

		if (!user)
			return res.status(404).json({
				auth: false,
				error: true,
				message: ErrorsMessages.invalidCredentials,
			});

		const userJSON = JSON.parse(JSON.stringify(user));
		userJSON.password = undefined;

		console.log(userJSON);

		const token = sign(userJSON, SECRET_WORD, { expiresIn: 60 * 60 * 24 });

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
};

export const logoutUser_controller = (req, res) => {
	const { authCookie } = req.cookies;

	console.log("logout");

	if (!authCookie)
		return res
			.status(401)
			.json({ error: true, message: ErrorsMessages.tokenNotFound });

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
};

export const profileUser_controller = async (req, res) => {
	const { authCookie } = req.cookies;

	if (!authCookie)
		return res
			.status(401)
			.json({ error: true, message: ErrorsMessages.tokenNotFound });

	let user = null;
	try {
		user = verify(authCookie, SECRET_WORD);
	} catch (error) {
		return res
			.status(500)
			.json({ error, message: ErrorsMessages.tokenInvalidOrDefeated });
	}

	try {
		let u = user.email == ROOT_USER ? user : await getUser_By_Email(user.email);

		if (!u)
			return res
				.status(400)
				.json({ error: true, message: ErrorsMessages.userNotFound });

		u = JSON.parse(JSON.stringify(u));

		return res.status(200).json({ ...u, password: undefined });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error, message: ErrorsMessages.inServer });
	}
};

export const sendEmailToChangePasswordUser_controller = async (req, res) => {
	try {
		const { email } = req.body;

		const result = await authorizeSendUrlToChangePassword_service(email);

		if (result.error) return res.status(400).json(result);

		return res.status(200).json({ error: false, message: "Revise su correo" });
	} catch (error) {
		console.log(error);

		return res.status(500).json({ error, message: ErrorsMessages.inServer });
	}
};

export const setPasswordUser_controller = async (req, res) => {
	try {
		const { token } = req.query;
		const { password, confirmPassword } = req.body;

		// verificar token
		let objToken = null;
		try {
			objToken = verify(token, SECRET_WORD);
			console.log("token valido");
		} catch (error) {
			console.log("el token es invalido o ya expiro");
			return res.status(400).json({
				error,
				message: ErrorsMessages.tokenInvalidOrDefeated,
			});
		}

		// todo: verificar que el token tenga el process de asignar contraseña

		const result = await setPasswordUser_service(
			objToken.user._id,
			password,
			confirmPassword
		);

		if (result.error) return res.status(400).json(result);

		return res
			.status(200)
			.json({ error: false, message: "Contraseña cambiada correctamente" });
	} catch (error) {
		console.log(error);

		return res.status(500).json({ error, message: ErrorsMessages.inServer });
	}
};
