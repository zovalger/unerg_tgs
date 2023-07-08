import { login_Request, logout_Request, profile_Request } from "@/api/auth.api";
import { useRouter } from "next/router";
import SocketContext from "./Socket.context";

const { createContext, useState, useContext, useEffect } = require("react");

const UserContext = createContext();

// ****************************************************************************
// 									datos y autenticacion del usuario
// ****************************************************************************

export const UserProvider = ({ children }) => {
	const { resetSocket } = useContext(SocketContext);

	const [auth, setAuth] = useState(false);
	const [user, setUser] = useState(null);

	const router = useRouter();

	useEffect(() => {
		if (user === null)
			getDataUser()
				.then((profile) => {
					if (!profile) return;
					setAuth(true);
				})
				.catch((error) => console.log(error));
	}, [user]);

	const login = async (credentials) => {
		// try {
		const resAuth = await login_Request(credentials);

		if (!resAuth.data.auth) throw new Error("No Autenticado");

		setAuth(true);

		const profile = await getDataUser();

		return profile;
	};

	const getDataUser = async () => {
		const { data: dataUser } = await profile_Request();

		if (dataUser.error) throw new Error(dataUser.error.message);

		setUser(dataUser);
		console.log("login");
		console.log();

		if (dataUser.role == "admin" || dataUser.role == "root")
			router.push("/admin/map");
		else router.push(`/driver/capacidad`);
		// resetSocket();

		return res.data;
	};

	const logout = async () => {
		const { data } = await logout_Request();

		if (data.error) throw new Error(data.error.message);

		const { success } = data;

		if (!success) throw new Error("Error innesperado");

		router.push("/login");

		setAuth(false);
		setUser(null);

		resetSocket();
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
