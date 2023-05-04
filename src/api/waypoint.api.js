import axios from "axios";

const url = "/api/waypoint";

// creacion
export const createWaypoint_Request = async (data) =>
	await axios.post(`${url}/`, data);

// obtencion
export const getAllWaypoints_Request = async () => await axios.get(`${url}`);

export const getWaypoint_By_Id_Request = async (id) =>
	await axios.get(`${url}/${id}`);

// actualizacion
export const updateWaypoint_Request = async (id, data) =>
	await axios.post(`${url}/${id}`, data);

// eliminacion
export const deleteWaypoint_Request = async () =>
	await axios.delete(`${url}/${id}`);
