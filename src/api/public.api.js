import axios from "axios";

const url = "/api/free";

export const getAllWaypoints_Request = async () =>
	await axios.get(`${url}/waypoint`);

export const getWaypoint_By_Id_Request = async (_id) =>
	await axios.get(`${url}/waypoint/${_id}`);

// horarios
export const getTimetable_By_Id_Request = async (_id) =>
	await axios.get(`${url}/timetable/${_id}`);

// rutas
export const getRuta_By_Id_Request = async (_id) =>
	await axios.get(`${url}/ruta/${_id}`);

// conductores

// buses
export const getAllBuses_Request = async () => await axios.get(`${url}/bus`);

export const getBus_By_Id_Request = async (_id) =>
	await axios.get(`${url}/bus/${_id}`);

export const getBusUsersDriver_By_Id_Request = async (_id) =>
	await axios.get(`${url}/bus/${_id}/users`);
