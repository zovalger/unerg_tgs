import axios from "axios";

const url = "/api/ruta";

// creacion
export const createRuta_Request = async (data) =>
	await axios.post(`${url}/`, data);

// obtencion
export const getAllRutas_Request = async () => await axios.get(`${url}`);

export const getRuta_By_Id_Request = async (_id) =>
	await axios.get(`${url}/${_id}`);

// actualizacion
export const updateRuta_Request = async (_id, data) =>
	await axios.put(`${url}/${_id}`, data);

// eliminacion
export const deleteRuta_Request = async (_id) =>
	await axios.delete(`${url}/${_id}`);
