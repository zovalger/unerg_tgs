import { createUser_service, loginUser_service } from "@/service/user.service";
import { serialize } from "cookie";
import { sign, verify } from "jsonwebtoken";

export async function registerUser_controller(req, res) {
	const { name, lastname, email, password } = req.body;

	if (!email)
		return res.status(400).json({ error: { message: "falta email" } });

	if (!password)
		return res.status(400).json({ error: { message: "falta la contrasena" } });

	try {
		const userData = { name, lastname, email, password };
		const user = await createUser_service(userData);

		if (!user)
			return res
				.status(500)
				.json({ error: { message: "error al crear el usuario" } });

		if (user.error) return res.status(400).json(user);

		return res.status(200).json(user);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error: { message: "error inesperado en el servidor" } });
	}
}

export async function loginUser_controller(req, res) {
	try {
		const { email, password } = req.body;

		const user = await loginUser_service({ email, password });

		if (!user)
			return res.status(400).json({
				auth: false,
				error: { message: "usuario o contraseña invalido" },
			});

		// return res.json(user);

		// expire in 30 days
		const optionToken = {
			...JSON.parse(JSON.stringify(user)),
			exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
		};

		const token = sign(optionToken, process.env.SECRET_WORD);

		const serialized = serialize("authCookie", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "none",
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
			sameSite: "none",
			maxAge: 0,
			path: "/",
		});

		res.setHeader("Set-Cookie", serialized);

		return res.status(200).json({
			auth: true,
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
		const user = verify(authCookie, process.env.SECRET_WORD);
		return res.status(200).json(user);
	} catch (error) {
		console.log(error);
	}
}
