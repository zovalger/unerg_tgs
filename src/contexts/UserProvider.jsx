import { login_Request, logout_Request, profile_Request } from "@/api/auth.api";
import { useRouter } from "next/router";

const { createContext, useState } = require("react");

const UserContext = createContext();

// ****************************************************************************
// 									datos y autenticacion del usuario
// ****************************************************************************

export const UserProvider = ({ children }) => {
	const [auth, setAuth] = useState(false);
	const [user, setUser] = useState(null);

	const router = useRouter();

	const login = async (credentials) => {
		// try {
		const resAuth = await login_Request(credentials);

		if (!resAuth.data.auth) throw new Error("No Autenticado");

		setAuth(true);

		const resProfile = await profile_Request();

		if (resProfile.data.error) throw new Error(resProfile.data.error.message);

		setUser(resProfile.data);
	};

	const logout = async () => {
		const { data } = await logout_Request();

		if (data.error) throw new Error(data.error.message);

		const { success } = data;

		if (!success) throw new Error("Error innesperado");

		setAuth(false);
		setUser(null);
		router.push("/login");
	};

	return (
		<UserContext.Provider
			value={{ auth, setAuth, user, setUser, login, logout }}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserContext;
