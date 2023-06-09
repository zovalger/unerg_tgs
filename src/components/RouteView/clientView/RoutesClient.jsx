import Link from "next/link";
import dynamic from "next/dynamic";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

//Estilos

import style from "@/styles/Routes/routes_view.module.css";

// contextos

import MapContext from "@/contexts/Map.context";
import RutaContext from "@/contexts/Ruta.context";

// Componentes


import BotonRuClient from "./BotonRuClient";
import { getAllRutas_Request } from "@/api/ruta.api";



export default function RoutesClient(props) {
	const { rutas, insertRuta, setEditingRoute, getRuta } =
		useContext(RutaContext);

	const router = useRouter();

	useEffect(() => {
		getAllRutas_Request()
			.then((res) => insertRuta(res.data))
			.catch((error) => console.log(error));
	}, []);

	const onClick = (_id) => {
		setEditingRoute(getRuta(_id));
		router.push(`./rutas/${_id}`);
	};

	return (
		<>
			<div className={style.container_routes}>
				<h2>Rutas disponibles</h2>

			

				{rutas.map((datos, id_1) => {
					return <BotonRuClient key={id_1} datos={datos} onClick={onClick}/>;
				})}
			</div>
		</>
	);
}
