import WaypointModel from "@/models/Waypoint.model";
import { sign } from "jsonwebtoken";

export const createWaypoint_service = async (data) => {
	try {
		const { name, description, type, state, coord } = data;

		const waypoint = new WaypointModel({
			name,
			description,
			type,
			state,
			coord,
		});

		await waypoint.save();

		return waypoint;
	} catch (error) {
		console.log(error);
	}
};

export const getAllWaypoints_service = async () => {
	try {
		const waypoints = await WaypointModel.find({ state: { $ne: "d" } });

		return waypoints;
	} catch (error) {
		console.log(error);
	}
};

export const getWaypoint_by_Id_service = async (_id = null) => {
	try {
		const waypoint = await WaypointModel.findById(_id);

		return waypoint;
	} catch (error) {
		console.log(error);
	}
};

export const getWaypoints_by_Ids_service = async (_ids = null) => {
	try {
	} catch (error) {
		console.log(error);
	}
};

export const getWaypoints_by_Name_service = async (
	name = null,
	includeDelete = false
) => {
	try {
	} catch (error) {
		console.log(error);
	}
};

export const updateWaypoint_service = async (_id, data) => {
	try {
		const { name, description, type, state, coord } = data;

		await WaypointModel.findByIdAndUpdate(_id, {
			name,
			description,
			type,
			state,
			coord,
		});

		const waypoint = await WaypointModel.findById(_id);

		console.log(waypoint);

		return waypoint;
	} catch (error) {
		console.log(error);
	}
};

export const deleteWaypoint_service = async (_id) => {
	try {
		const waypoint = await WaypointModel.findById(_id);

		if (waypoint.state === "a") {
			waypoint.state = "d";
			await waypoint.save();
		} else {
			// borrar definitivamente
			// await WaypointModel.findByIdAndDelete(_id);
			// console.log(await waypoint.remove());
		}

		return waypoint;
	} catch (error) {
		console.log(error);
	}
};
