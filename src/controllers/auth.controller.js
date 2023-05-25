import { SECRET_WORD } from "@/config";

import ErrorsMessages from "@/config/errorsMessages";
import {
	authorizeSendUrlToChangePassword_service,
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

export const profileUser_controller = (req, res) => {
	const { authCookie } = req.cookies;

	if (!authCookie)
		return res
			.status(401)
			.json({ error: true, message: ErrorsMessages.tokenNotFound });

	try {
		const user = verify(authCookie, SECRET_WORD);
		return res.status(200).json(user);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error, message: ErrorsMessages.tokenInvalidOrDefeated });
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
		} catch (error) {
			console.log(error);
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
