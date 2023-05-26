import bcrypt from "bcrypt";

import AdminModel from "@/models/Admin.model";
import DriverModel from "@/models/Driver.model";
import {
	getUser_By_Email,
	getUser_By_Id,
	sendUrlToChangePasswordUser_service,
} from "./auth.service";
import userProcess from "@/config/userProcess";

export const createUserDriver_service = async ({
	name,
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
		const oldUser = await getUser_By_Email(email);
		if (oldUser) return { error: true, message: "Correo ya esta registrado" };

		const data = {
			name,
			CI,
			birthdate,
			address,
			bloodType,
			phone,
			emergencyPhone,
			email,
			busId,
			timetableId,
			password: "password",
		};

		const driver = new DriverModel(data);

		await driver.save();

		// todo: enviar verificacion al correo
		await sendUrlToChangePasswordUser_service(
			driver,
			userProcess.setFirstPassword
		);

		return driver;
	} catch (error) {
		console.log(error);
	}
};

export const updateUserDriver_service = async (
	_id,
	{
		name,
		CI,
		birthdate,
		address,
		bloodType,
		phone,
		emergencyPhone,
		email,
		busId,
		timetableId,
	}
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
			bloodType,
			phone,
			emergencyPhone,
			email,
			busId,
			timetableId,
			password: "password",
		};

		const result = await DriverModel.updateOne({ _id }, data);

		const driver = await DriverModel.findById(_id, { password: 0 });

		return driver;
	} catch (error) {
		console.log(error);
	}
};

export const getAllUserDriver_service = async () => {
	try {
		const drivers = await DriverModel.find()
			.sort({ name: -1 })
			.populate("busId");

		return drivers;
	} catch (error) {
		console.log(error);
	}
};
