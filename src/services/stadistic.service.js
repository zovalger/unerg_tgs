import ErrorsMessages from "@/config/errorsMessages";
import TimetableModel from "@/models/Timetable.model";
import { getAllTimetables_service } from "./timetable.service";
import { getAllRutas_service } from "./ruta.service";
import { getAllUserDriver_service } from "./userDriver.service";
import { getAllUserAdmin_service } from "./userAdmin.service";
import { getAllActiveBuses_service } from "./bus.service";
import { getAllBusTravel_service } from "./busTravel.service";
import { getAllBusAverias_service } from "./busAveria.service";
import { getAllActiveWaypoints_service } from "./waypoint.service";
import UsersCountModel from "@/models/UsersCount.model";

export const getStadisticIndexation_service = async () => {
	try {
		const data = {
			buses: {},
			averias: {},
			busTravels: {},
			rutas: {},
			timetables: {},
			admins: {},
			drivers: {},
			waypoints: {},
		};

		data.buses = await getAllActiveBuses_service();
		data.averias = await getAllBusAverias_service();
		data.busTravels = await getAllBusTravel_service();
		data.rutas = await getAllRutas_service();
		data.timetables = await getAllTimetables_service();
		data.admins = await getAllUserAdmin_service();
		data.drivers = await getAllUserDriver_service();
		data.waypoints = await getAllActiveWaypoints_service();

		await UsersCountModel.deleteMany({
			conectionDate: { $lt: new Date(Date.now() - 6 * 60 * 60 * 1000) },
		});
		
		data.usersCount = await UsersCountModel.find();

		return data;
	} catch (error) {
		console.log(error);
	}
};

export const addCountUser = async (socketId, user) => {
	if (!socketId) return;

	try {
		await UsersCountModel.deleteMany({
			conectionDate: { $lt: new Date(Date.now() - 6 * 60 * 60 * 1000) },
		});
		const n = new UsersCountModel({
			socket: socketId,
			conectionDate: new Date(),
			role: user ? user.role : "visit",
		});

		await n.save();
	} catch (error) {
		console.log(error);
	}
};

export const subtracCountUser = async (socketId) => {
	if (!socketId) return;

	try {
		await UsersCountModel.deleteMany({
			conectionDate: { $lt: new Date(Date.now() - 6 * 60 * 60 * 1000) },
		});

		await UsersCountModel.findOneAndDelete({ socket: socketId });
	} catch (error) {
		console.log(error);
	}
};
