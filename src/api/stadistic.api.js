import axios from "axios";

const url = "/api/stadistic";

// creacion
export const getStadisticIndexation_Request = async (data) =>
	await axios.get(`${url}`, data);
