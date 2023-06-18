import ErrorsMessages from "@/config/errorsMessages";

import BusTravelModel from "@/models/BusTravel.model";
import { getBus_by_Id_service } from "./bus.service";
import { getRuta_by_Id_service } from "./ruta.service";

// ********************************************************************
// 								buses: Creacion en la DB
// ********************************************************************

export const createBusTravel_service = async (driver) => {
	const { _id, timetableId, busId } = driver;

	try {
		const bus = await getBus_by_Id_service(busId);
		const ruta = await getRuta_by_Id_service(bus.ruta);

		const busTravel = new BusTravelModel({
			driver: _id,
			timetableDriver: timetableId,
			bus: busId,
			ruta: ruta._id,
			timetableRuta: ruta.timetableId,
		});

		await busTravel.save();

		//console.log(busTravel);

		return busTravel;
	} catch (error) {
		console.log(error);
	}
};

export const updateBustravelWaypoints_service = async (driverId, coord) => {
	// ir guardando las coordenadas que vienen del autobus
	const busTravel = await BusTravelModel.findOne({
		driver: driverId,
		endDate: null,
	});

	const { waypoints } = busTravel;

	busTravel.waypoints = [...waypoints, { ...coord, date: new Date() }];
	await busTravel.save();
};

// finalizar el recorrido de una vuelta de una ruta
export const finishBusTravel_service = async (driverId, busTravel = {}) => {
	const { waypoints, waypointsVisited } = busTravel;
	try {
		const oldBusTravel = await BusTravelModel.findOne({
			driver: driverId,
			endDate: null,
		});

		if (waypoints && waypointsVisited) {
			oldBusTravel.waypoints = waypoints;
			oldBusTravel.waypointsVisited = waypointsVisited;
		}
		
		oldBusTravel.endDate = new Date();

		await oldBusTravel.save();

		return oldBusTravel;
	} catch (error) {
		console.log(error);
	}
};
