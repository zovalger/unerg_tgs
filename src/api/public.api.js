import axios from "axios";

const url = "/api/free";

export const getAllWaypoints_Request = async () =>
	await axios.get(`${url}/waypoint`);

export const getWaypoint_By_Id_Request = async (_id) =>
	await axios.get(`${url}/waypoint/${_id}`);
