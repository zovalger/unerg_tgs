import axios from "axios";

const url = "/api/user";

export const login_Request = async (credentials) =>
	await axios.post(`${url}/login`, credentials);

export const profile_Request = async () => await axios.post(`${url}/profile`);

export const logout_Request = async () => await axios.post(`${url}/logout`);

export const setPassword_Request = async (token, data) =>
	await axios.post(`${url}/credentials/${token}/set-password`, data);

export const sendEmailToChangePassword_Request = async (data) =>
	await axios.post(`${url}/credentials/send-email-to-change-password`, data);
