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

		const buses = await getAllActiveBuses_service();
		const averias = await getAllBusAverias_service();
		const busTravels = await getAllBusTravel_service();
		const rutas = await getAllRutas_service();
		const timetables = await getAllTimetables_service();
		const admins = await getAllUserAdmin_service();
		const drivers = await getAllUserDriver_service();
		const waypoints = await getAllActiveWaypoints_service();
		const usersCount = await UsersCountModel.find();

		data.busTravels = busTravels;
		data.usersCount = usersCount;

		data.buses.count = buses.length;
		data.averias.count = averias.length;
		data.rutas.count = rutas.length;
		data.timetables.count = timetables.length;
		data.admins.count = admins.length;
		data.drivers.count = drivers.length;
		data.waypoints.count = waypoints.length;

		for (const element of buses) {
			data.buses[element._id] = element;
		}
		for (const element of averias) {
			data.averias[element._id] = element;
		}

		for (const element of rutas) {
			data.rutas[element._id] = element;
		}
		for (const element of timetables) {
			data.timetables[element._id] = element;
		}
		for (const element of admins) {
			data.admins[element._id] = element;
		}
		for (const element of drivers) {
			data.drivers[element._id] = element;
		}
		for (const element of waypoints) {
			data.waypoints[element._id] = element;
		}

		return data;
	} catch (error) {
		console.log(error);
	}
};

export const addCountUser = async (socketId, user) => {
	if (!socketId) return;

	try {
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
		await UsersCountModel.findOneAndDelete({ socket: socketId });
	} catch (error) {
		console.log(error);
	}
};
