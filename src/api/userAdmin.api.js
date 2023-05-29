import axios from "axios";

const url = "/api/user/admin";

// creacion
export const createAdminUser_Request = async (data) =>
	await axios.post(`${url}/register`, data);

// obtencion
export const getAllAdmins_Request = async () => await axios.get(`${url}`);

export const getAdmin_By_Id_Request = async (_id) =>
	await axios.get(`${url}/${_id}`);

// actualizacion
export const updateAdmin_Request = async (_id, data) =>
	await axios.put(`${url}/${_id}`, data);

// eliminacion
export const deleteAdmin_Request = async (_id) =>
	await axios.delete(`${url}/${_id}`);
