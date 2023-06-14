import UserContext from "@/contexts/User.context";
import Head from "next/head";
import { useRouter } from "next/router";
import { use, useContext, useEffect } from "react";
import { DriverDataManager } from "./DriverDataManager";

function Layout({ children }) {
	const router = useRouter();

	const { user, auth } = useContext(UserContext);

	const authVerific = () => {
		if (!auth) return;

		const tag = router.asPath;
		const rolesRutas = tag.match(/\/admin\/|\/driver\//gi);

		if (!rolesRutas) return;

		if (rolesRutas.length > 0 && !auth) return router.replace("/login");

		if (!user) return router.replace("/login");

		if (user.role !== "root")
			if (rolesRutas[0] != `/${user.role}/`) {
				if (user.role === "admin") return router.replace(`/admin/map`);
				if (user.role === "driver") return router.replace(`/driver/capacidad`);
			}
	};

	useEffect(() => {
		authVerific();
	}, [user]);

	return (
		<div>
			<DriverDataManager />
			<Head>
				<meta
					name="description"
					content="Sistema de geolocalización de la autobuses de la UNERG en San Juan de los Morros, Estado Guárico"
				/>
				<title>UNERG-TGS</title>
			</Head>

			<main> {children} </main>
		</div>
	);
}

export default Layout;
