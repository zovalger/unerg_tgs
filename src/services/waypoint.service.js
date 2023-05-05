import WaypointModel from "@/models/Waypoint.model";
import { sign } from "jsonwebtoken";

export const createWaypoint_service = async (data) => {
	try {
		const { name, description, type, coord } = data;

		console.log(name, description, type, coord);

		const waypoint = new WaypointModel({
			name,
			description,
			type,
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
		_ids.map((id) => {
			if (typeof id.toString() !== "string")
				throw new Error(`${id} no es un formato correcto de _id`);
		});

		const waypoints = await WaypointModel.find(
			{ _id: { $in: _ids } },
			(err, docs) => {
				if (err) console.log(err);
				else {
					// ordenar los documentos según el orden de los _ids
					const sortedDocs = ids.map((id) =>
						docs.find((doc) => doc._id.toString() === id)
					);
					console.log(sortedDocs);
				}
			}
		);

		return waypoints.filter((w) => w !== undefined);
	} catch (error) {
		console.log(error);
	}
};

// export const IsThatsWaypointCreated_service = async(_ids);

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

export const createOrUpdateWapoint_service = async (data) => {
	try {
		const waypoint = data._id
			? await updateWaypoint_service(data.id, data)
			: await createWaypoint_service(data);

		return waypoint;
	} catch (error) {
		console.log(error);
	}
};

export const deleteWaypoint_service = async (_id) => {
	try {
		const waypoint = await WaypointModel.findById(_id);

		if (waypoint.status === "a") {
			waypoint.status = "d";
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
