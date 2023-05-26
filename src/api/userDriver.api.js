import axios from "axios";

const url = "/api/user/driver/register";

// creacion
export const createDriverUser_Request = async (data) =>
	await axios.post(`${url}/`, data);

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
