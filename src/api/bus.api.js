import axios from "axios";

const url = "/api/bus";

// creacion
export const createBus_Request = async (data) =>
	await axios.post(`${url}/`, data);

// obtencion
export const getAllBuses_Request = async () => await axios.get(`${url}`);

export const getAllNums_Request = async () => await axios.get(`${url}/nums`);

export const getAllPlacas_Request = async () =>
	await axios.get(`${url}/placas`);

export const getBus_By_Id_Request = async (_id) =>
	await axios.get(`${url}/${_id}`);

export const getBusUsersDriver_By_Id_Request = async (_id) =>
	await axios.get(`${url}/${_id}/users`);

// actualizacion
export const updateBus_Request = async (_id, data) =>
	await axios.put(`${url}/${_id}`, data);

// eliminacion
export const deleteBus_Request = async (_id) =>
	await axios.delete(`${url}/${_id}`);
