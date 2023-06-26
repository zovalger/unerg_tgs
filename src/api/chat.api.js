import axios from "axios";

const url = "/api/chat";

// creacion
export const getAllNamesUsers_Request = async (data) =>
	await axios.get(`${url}/names`, data);
