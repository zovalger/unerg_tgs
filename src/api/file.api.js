import axios from "axios";

const url = "/api/files";

// creacion
export const sendImg_Request = async (data) =>
	await axios.post(`${url}/img`, data);
