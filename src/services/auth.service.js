import bcrypt from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { SECRET_WORD, SERVER_URL } from "@/config";
import AdminModel from "@/models/Admin.model";
import DriverModel from "@/models/Driver.model";
import userProcess from "@/config/userProcess";
import ErrorsMessages from "@/config/errorsMessages";

export const getUser = async (_id, email) => {
	if (!email && !_id) return;

	const search = { $or: [{ email }, { _id }] };

	let user = await DriverModel.findOne(search);
	if (!user) user = await AdminModel.findOne(search);

	return user ? user : null;
};

export const loginUser_service = async ({ email, password }) => {
	if (!email || !password) return;

	try {
		const user = await getUser(null, email);
		if (!user) return;

		const result = await bcrypt.compare(password, user.password);
		console.log(user);
		console.log(result);

		return result ? { ...user, password: undefined } : null;
	} catch (error) {
		console.log(error);
	}
};

// enviara el link al correo del usuario para cambiar la contrasena
export const sendUrlToChangePasswordUser_service = async (user) => {
	// const { email } = user;

	const userJson = JSON.parse(JSON.stringify(user));

	const token = sign(
		{
			user: { ...userJson, password: undefined },
			userProcess: userProcess.setFirstPassword,
		},
		SECRET_WORD,
		{
			expiresIn: 30 * 60 * 1000,
		}
	);

	// ruta del front para el formulario de cambiar contraseña
	const url = `${SERVER_URL}/credentials/${token}/changePassword`;

	console.log(url);

	// todo: enviar correo electronico

	try {
		return {};
	} catch (error) {
		console.log(error);
		return { error, message: ErrorsMessages.inServer };
	}
};

export const authorizeSendUrlToChangePassword_service = async (email) => {
	if (!email) return { error: true, message: "Correo no proporcinado" };

	try {
		const user = await getUser(null, email);
		if (!user) return { error: true, message: ErrorsMessages.userNotFound };

		await sendUrlToChangePasswordUser_service(user);

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
		const user = await getUser(_id);
		if (!user) return { error: true, message: ErrorsMessages.userNotFound };

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
