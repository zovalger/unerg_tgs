import AdminModel from "@/models/Admin.model";
import {
	getUser_By_Email,
	sendUrlToChangePasswordUser_service,
} from "./auth.service";
import userProcess from "@/config/userProcess";

export const createUserAdmin_service = async ({
	name,
	CI,
	birthdate,
	address,
	phone,
	email,
	perfilImg,
	permissions,
}) => {
	try {
		// buscar si ya hay uno registrado
		const oldUser = await getUser_By_Email(email);
		if (oldUser) return { error: true, message: "Correo ya esta registrado" };

		const data = {
			name,
			CI,
			birthdate,
			address,
			phone,
			email,
			perfilImg,
			permissions,
			password: "password",
		};

		const admin = new AdminModel(data);

		// todo: enviar verificacion al correo
		await sendUrlToChangePasswordUser_service(
			admin,
			userProcess.setFirstPassword
		);

		await admin.save();

		return admin;
	} catch (error) {
		console.log(error);
	}
};

export const updateUserAdmin_service = async (
	_id,
	{ name, CI, birthdate, address, phone, email, perfilImg, permissions }
) => {
	try {
		// buscar si ya hay uno registrado

		const oldUser = await getUser_By_Email(email);
		if (oldUser && oldUser._id != _id)
			return { error: true, message: "Correo ya esta registrado" };

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

		const result = await AdminModel.updateOne({ _id }, data);

		const admin = await AdminModel.findById(_id, { password: 0 });

		return admin;
	} catch (error) {
		console.log(error);
	}
};

export const getAllUserAdmin_service = async () => {
	try {
		const admins = await AdminModel.find().sort({ name: 1 });

		return admins;
	} catch (error) {
		console.log(error);
	}
};

export const getUserAdmin_service = async (_id) => {
	try {
		const admin = await AdminModel.findById(_id);

		return admin;
	} catch (error) {
		console.log(error);
	}
};
