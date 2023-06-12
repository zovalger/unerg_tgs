import DriverModel from "@/models/Driver.model";
import {
	getUser_By_Email,
	sendUrlToChangePasswordUser_service,
} from "./auth.service";
import userProcess from "@/config/userProcess";
import TimetableModel from "@/models/Timetable.model";
import ErrorsMessages from "@/config/errorsMessages";
import { getTimetable_by_Id_service } from "./timetable.service";
import verificInTimetable from "@/utils/verificInTimetable";

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

export const getUserDriver_service = async (_id) => {
	try {
		const driver = await DriverModel.findById(_id, { password: 0 });

		return driver;
	} catch (error) {
		console.log(error);
	}
};

export const getAllUserDriver_service = async () => {
	try {
		// TimetableModel

		const drivers = await DriverModel.find({}, { password: 0 })
			.sort({ name: 1 })
			.populate(["busId", "timetableId"]);

		return drivers;
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const getAllUserDriver_by_BusId_service = async (_id) => {
	try {
		// TimetableModel

		const drivers = await DriverModel.find(
			{ busId: _id },
			{ _id: 1, name: 1, CI: 1, bloodType: 1, timetableId: 1, perfilImg: 1 }
		)
			.sort({ name: 1 })
			.populate(["timetableId"]);

		return drivers;
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const startInServiceUserDriver_service = async (_id) => {
	try {
		// TimetableModel

		const driver = await DriverModel.findById(_id);

		if (!driver) return;

		const timetable = await getTimetable_by_Id_service(driver.timetableId);

		if (!verificInTimetable(timetable))
			return { error: true, message: ErrorsMessages.noInYourTimetable };

		const otherDriver = await DriverModel.findOne({
			_id: { $ne: driver._id },
			busId: driver.busId,
			inService: true,
		});

		if (otherDriver)
			return { error: true, message: ErrorsMessages.otherIsInService };

		driver.inService = true;

		await driver.save();

		return { inService: true };
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const stopInServiceUserDriver_service = async (_id) => {
	try {
		// TimetableModel

		const driver = await DriverModel.findById(_id);

		if (!driver) return;

		driver.inService = false;

		await driver.save();

		return { inService: false };
	} catch (error) {
		console.log(error);
		return [];
	}
};
