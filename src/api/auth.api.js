import axios from "axios";

const url = "/api/user";

export const login_Request = (credentials) =>
	axios.post(`${url}/login`, credentials);

export const profile_Request = () => axios.post(`${url}/profile`);

export const logout_Request = () => axios.post(`${url}/logout`);
