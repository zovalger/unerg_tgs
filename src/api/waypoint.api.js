import axios from "axios";

const url = "/api/waypoint";

// creacion
export const createWaypoint_Request = async (data) =>
	await axios.post(`${url}/`, data);

// obtencion
export const getAllWaypoints_Request = async () => await axios.get(`${url}`);

export const getWaypoint_By_Id_Request = async (_id) =>
	await axios.get(`${url}/${_id}`);

// actualizacion
export const updateWaypoint_Request = async (_id, data) =>
	await axios.put(`${url}/${_id}`, data);

// eliminacion
export const deleteWaypoint_Request = async (_id) =>
	await axios.delete(`${url}/${_id}`);
