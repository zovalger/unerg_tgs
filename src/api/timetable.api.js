import axios from "axios";

const url = "/api/timetable";

// creacion
export const createTimetable_Request = async (data) =>
	await axios.post(`${url}/`, data);

// obtencion
export const getAllTimetables_Request = async () => await axios.get(`${url}`);

export const getAllDriverTimetables_Request = async () =>
	await axios.get(`${url}/driver`);
	
export const getAllRutaTimetables_Request = async () =>
	await axios.get(`${url}/ruta`);

export const getTimetable_By_Id_Request = async (_id) =>
	await axios.get(`${url}/${_id}`);

// actualizacion
export const updateTimetable_Request = async (_id, data) =>
	await axios.put(`${url}/${_id}`, data);

// eliminacion
export const deleteTimetable_Request = async (_id) =>
	await axios.delete(`${url}/${_id}`);
