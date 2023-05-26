import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "reactstrap";

const Home = () => {
	return (
		<>
			<Link href={"/map"} className="btn btn-info w-100 m-2">
				mapa
			</Link>
			<br />
			<Link href={"/login"} className="btn btn-info w-100 m-2">
				login
			</Link>
			<br />
			<Link href={"/admin/map"} className="btn btn-info w-100 m-2">
				mapa admin
			</Link>
			<br />
			<Link href={"/driver/map"} className="btn btn-info w-100 m-2">
				mapa de conductor
			</Link>
		</>
	);
};

export default Home;
