import axios from "axios";

const url = "/api/user";

export const login_Request = async (credentials) =>
	await axios.post(`${url}/login`, credentials);

export const profile_Request = async () => await axios.post(`${url}/profile`);

export const logout_Request = async () => await axios.post(`${url}/logout`);
