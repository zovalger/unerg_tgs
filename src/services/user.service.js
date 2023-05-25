import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "@/models/User.model";
import { SECRET_WORD } from "@/config";
import AdminModel from "@/models/Admin.model";
import DriverModel from "@/models/Driver.model";

const saltRounds = 10;

export const loginUser_service = async ({ email, password }) => {
	if (!email || !password) return;

	try {
		let user = await AdminModel.findOne({ email });
		if (!user) user = await DriverModel.findOne({ email });

		if (!user) return;

		const result = await bcrypt.compare(password, user.password);
		console.log(result);

		return result ? { ...user, password: undefined } : null;
	} catch (error) {
		console.log(error);
	}
};

// **************************************************
// 											driver
// **************************************************

export const createUserDriver_service = async ({
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
}) => {
	try {
		// buscar si ya hay uno registrado
		let oldUser = await DriverModel.findOne({ email });
		if (!oldUser) oldUser = await AdminModel.findOne({ email });
		if (oldUser) return { error: true, message: "Correo ya esta registrado" };

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

		const driver = new DriverModel(data);

		// await driver.save();

		// todo: enviar verificacion al correo
		await sendUrlToChangePasswordUser_service(driver);

		return driver;
	} catch (error) {
		console.log(error);
	}
};

// enviara el link al correo del usuario para cambiar la contrasena
export const sendUrlToChangePasswordUser_service = async (user) => {};

// verificar usuario para colocar contrasena
// se recibira el usuario por un token y su contrasena y la confirmacion de la contrasena
export const setPasswordUser_service = async (
	user,
	password,
	confirmPassword
) => {};

// enviar la url al nuevo correo registrado del usuario
// el token tiene el usuario y el nuevo correo
export const sendUrlToChangeEmailUser_service = async (
	user,
	password,
	newEmail
) => {};

// le asignara el nuevo correo al usuario
export const changeEmailUser_service = async (user, newEmail) => {};

export const createUser_service = async ({
	name,
	lastname,
	email,
	password,
}) => {
	try {
		const oldUser = await UserModel.findOne({ email });

		if (oldUser) return { error: true, message: "Correo ya esta registrado" };

		const newUser = await UserModel.create({
			name,
			lastname,
			email,
			password: sign(password, SECRET_WORD),
		});

		console.log(newUser);

		return newUser;
	} catch (error) {
		console.log(error);
	}
};

// **************************************************
// 											admin
// **************************************************
