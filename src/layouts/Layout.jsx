import UserContext from "@/contexts/User.context";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

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

		if (rolesRutas[0] != `/${user.role}/`)
			return router.replace(`/${user.role}/map`);
	};

	useEffect(() => {
		authVerific();
	}, [user]);

	return (
		<div>
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
