import DriverModel from "@/models/Driver.model";
import {
	getUser_By_Email,
	sendUrlToChangePasswordUser_service,
} from "./auth.service";
import userProcess from "@/config/userProcess";
import TimetableModel from "@/models/Timetable.model";

export const createUserDriver_service = async ({
	name,
	CI,
	birthdate,
	address,
	bloodType,
	phone,
	emergencyPhone,
	email,
	perfilImg,
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
			perfilImg,
			busId,
			timetableId,
			password: "password",
		};

		const driver = new DriverModel(data);

		// todo: enviar verificacion al correo
		await sendUrlToChangePasswordUser_service(
			driver,
			userProcess.setFirstPassword
		);

		await driver.save();

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
		perfilImg,
		busId,
		timetableId,
	}
) => {
	try {
		if (busId == "") busId = null;
		if (timetableId == "") timetableId = null;

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
			perfilImg,
			busId,
			timetableId,
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

		// TimetableModel


		const drivers = await DriverModel.find()
			.sort({ name: 1 })
			.populate(["busId", "timetableId"]);

		return drivers;
	} catch (error) {
		console.log(error);
		return []
	}
};

export const getUserDriver_service = async (_id) => {
	try {
		const driver = await DriverModel.findById(_id);

		return driver;
	} catch (error) {
		console.log(error);
	}
};
