import {
	createWaypoint_service,
	deleteWaypoint_service,
	getAllActiveWaypoints_service,
	getWaypoint_by_Id_service,
	updateWaypoint_service,
} from "@/services/waypoint.service";

import { sign, verify } from "jsonwebtoken";

export const createWaypoint_controller = async (req, res) => {
	try {
		const { name, description, type, state, coord } = req.body;

		const waypoint = await createWaypoint_service({
			name,
			description,
			type,
			state,
			coord,
		});

		if (!waypoint)
			res.status(500).json({ error: { message: "Error en el servidor" } });

		res.status(200).json(waypoint);
	} catch (error) {
		console.log(error);
	}
};

export const getAllActiveWaypoints_controller = async (req, res) => {
	try {
		const waypoints = await getAllActiveWaypoints_service();

		if (!waypoints)
			res.status(500).json({ error: { message: "Error en el servidor" } });

		if (waypoints.length <= 0)
			res.status(404).json({ error: { message: "No hay paradas" } });

		return res.status(200).json(waypoints);
	} catch (error) {
		console.log(error);
	}
};

export const getWaypoint_By_Id_controller = async (req, res) => {
	try {
		const { _id } = req.query;

		const waypoint = await getWaypoint_by_Id_service(_id);

		if (!waypoint)
			res.status(404).json({ error: { message: "Parada no encontrada" } });

		return res.status(200).json(waypoint);
	} catch (error) {
		console.log(error);
	}
};

export const updateWaypoint_controller = async (req, res) => {
	try {
		const { _id } = req.query;
		const { name, description, type, state, coord } = req.body;

		const waypoint = await updateWaypoint_service(_id, {
			name,
			description,
			type,
			state,
			coord,
		});

		if (!waypoint)
			res.status(500).json({ error: { message: "Error en el servidor" } });

		res.status(200).json(waypoint);
	} catch (error) {
		console.log(error);
	}
};

export const deleteWaypoint_controller = async (req, res) => {
	try {
		const { _id } = req.query;

		const result = await deleteWaypoint_service(_id);

		if (!result)
			res.status(500).json({ error: { message: "Error en el servidor" } });

		res.status(200).json(result);
	} catch (error) {
		console.log(error);
	}
};
