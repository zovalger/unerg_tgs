import axios from "axios";

const url = "/api/user/driver";

// creacion
export const createDriverUser_Request = async (data) =>
	await axios.post(`${url}/register`, data);

// obtencion
export const getAllDrivers_Request = async () => await axios.get(`${url}`);

export const getDriver_By_Id_Request = async (_id) =>
	await axios.get(`${url}/${_id}`);

// actualizacion
export const updateDriver_Request = async (_id, data) =>
	await axios.put(`${url}/${_id}`, data);

// eliminacion
export const deleteDriver_Request = async (_id) =>
	await axios.delete(`${url}/${_id}`);

export const startInServiceDriver_Request = async (_id) =>
	await axios.post(`${url}/${_id}/inService/start`);

export const stopInServiceDriver_Request = async (_id, data) =>
	await axios.post(`${url}/${_id}/inService/stop`, data);
