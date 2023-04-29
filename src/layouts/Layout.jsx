import Head from "next/head";

function Layout({ children }) {
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
