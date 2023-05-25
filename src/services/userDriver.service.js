import bcrypt from "bcrypt";

import AdminModel from "@/models/Admin.model";
import DriverModel from "@/models/Driver.model";
import {
	getUser_By_Email,
	getUser_By_Id,
	sendUrlToChangePasswordUser_service,
} from "./auth.service";

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

		// let oldUser = await DriverModel.findOne({ email });
		// if (!oldUser) oldUser = await AdminModel.findOne({ email });
		const oldUser = await getUser_By_Email(email);
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

		await driver.save();

		// todo: enviar verificacion al correo
		await sendUrlToChangePasswordUser_service(driver);

		return driver;
	} catch (error) {
		console.log(error);
	}
};
