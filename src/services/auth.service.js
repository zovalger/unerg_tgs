import bcrypt from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { SECRET_WORD, SERVER_URL, ROOT_USER, ROOT_PASSWORD } from "@/config";
import AdminModel from "@/models/Admin.model";
import DriverModel from "@/models/Driver.model";
import userProcess from "@/config/userProcess";
import ErrorsMessages from "@/config/errorsMessages";
import { sendEmail } from "@/lib/emailSender";
import { getRootUserPerfil } from "./userAdmin.service";

export const getUser_By_Id = async (_id) => {
	if (!_id) return;

	let user = await DriverModel.findById(_id);
	if (!user) user = await AdminModel.findById(_id);

	return user ? user : null;
};

export const getUser_By_Email = async (email) => {
	if (!email) return;

	let user = await DriverModel.findOne({ email });
	if (!user) user = await AdminModel.findOne({ email });

	return user ? user : null;
};

export const loginUser_service = async ({ email, password }) => {
	if (!email || !password) return;

	console.log(ROOT_USER, ROOT_PASSWORD);

	try {
		if (email == ROOT_USER && password == ROOT_PASSWORD)
			return getRootUserPerfil();

		const user = await getUser_By_Email(email);
		if (!user) return;

		const result = await bcrypt.compare(password, user.password);
		console.log(user);
		console.log(result);

		return result ? user : null;
	} catch (error) {
		console.log(error);
	}
};

// enviara el link al correo del usuario para cambiar la contrasena
export const sendUrlToChangePasswordUser_service = async (
	user,
	userProcess
) => {
	// const { email } = user;

	const userJson = JSON.parse(JSON.stringify(user));

	const token = sign(
		{ user: { ...userJson, password: "" }, userProcess },
		SECRET_WORD,
		{
			expiresIn: "1h",
		}
	);

	// ruta del front para el formulario de cambiar contraseña
	const url = `${SERVER_URL}/credentials/${token}/change-password`;

	await sendEmail(
		userJson.email,
		userProcess,
		`<p>
				accede al siguiente link para cambiar tu contraseña, <a href="${url}"> click aqui </a>
			</p>`
	);

	console.log(url);

	// todo: enviar correo electronico

	try {
		return { error: false, message: "revise su correo" };
	} catch (error) {
		console.log(error);
		return { error, message: ErrorsMessages.inServer };
	}
};

export const authorizeSendUrlToChangePassword_service = async (email) => {
	if (!email) return { error: true, message: "Correo no proporcinado" };

	try {
		const user = await getUser_By_Email(email);
		if (!user) return { error: true, message: ErrorsMessages.userNotFound };

		await sendUrlToChangePasswordUser_service(user, userProcess.changePassword);

		return { message: "verifique correo" };
	} catch (error) {
		return { error, message: "Error al enviar el correo" };
	}
};

// verificar usuario para colocar contrasena
// se recibira el usuario por un token y su contrasena y la confirmacion de la contrasena
export const setPasswordUser_service = async (
	_id,
	password,
	confirmPassword
) => {
	// verificamos que esten todos los parametros
	if (!_id) return { error: true, message: "_id de usuario no proporsionado" };
	if (!password || !confirmPassword)
		return {
			error: true,
			message: "no se proporciono la contraseña o su confirmacion",
		};
	if (password != confirmPassword)
		return {
			error: true,
			message: "las contraseñas proporcionadas no son iguales",
		};

	// cambiar contraseña
	try {
		const user = await getUser_By_Id(_id);
		if (!user) return { error: true, message: ErrorsMessages.userNotFound };
		// console.log(user);

		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		user.password = hash;

		await user.save();

		return { error: false, message: "contraseña cambiada correctamente" };
	} catch (error) {
		return { error, message: "error al guardar la contraseña" };
	}
};

// enviar la url al nuevo correo registrado del usuario
// el token tiene el usuario y el nuevo correo
export const sendUrlToChangeEmailUser_service = async (
	user,
	password,
	newEmail
) => {};

// le asignara el nuevo correo al usuario
export const changeEmailUser_service = async (user, newEmail) => {};
