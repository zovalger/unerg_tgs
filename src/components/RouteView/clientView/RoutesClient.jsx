import Link from "next/link";
import dynamic from "next/dynamic";
import { useContext, useEffect } from "react";

//Estilos

import style from "@/styles/Routes/routes_view.module.css";

// contextos

import MapContext from "@/contexts/Map.context";
import RutaContext from "@/contexts/Ruta.context";

// Componentes


import BotonRuClient from "./BotonRuClient";
import { getAllRutas_Request } from "@/api/ruta.api";
import { useRouter } from "next/router";


export default function RoutesClient(props) {
	const { rutas, insertRuta, setEditingRoute, getRuta } =
		useContext(RutaContext);

	const router = useRouter();

	useEffect(() => {
		getAllRutas_Request()
			.then((res) => insertRuta(res.data))
			.catch((error) => console.log(error));
	}, []);



	return (
		<>
			<div className={style.container_routes}>
				<h2>Rutas disponibles</h2>

			

				{rutas.map((datos, id_1) => {
					return <BotonRuClient key={id_1} datos={datos} />;
				})}
			</div>
		</>
	);
}
