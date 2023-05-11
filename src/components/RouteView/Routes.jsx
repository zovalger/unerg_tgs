import Link from "next/link";
import dynamic from "next/dynamic";
import { useContext, useEffect } from "react";

//Estilos

import style from "../../styles/Routes/routes_view.module.css";

// contextos

import MapContext from "@/contexts/Map.context";
import RutaContext from "@/contexts/Ruta.context";

// Componentes

import { IoIosAdd } from "react-icons/io";

import BotonRu from "./BotonRu";
import { getAllRutas_Request } from "@/api/ruta.api";

export default function Routes(props) {
	const { rutas, insertRuta } = useContext(RutaContext);

	useEffect(() => {
		getAllRutas_Request()
			.then((res) => insertRuta(res.data))
			.catch((error) => console.log(error));
	}, []);

	return (
		<>
			<div className={style.container_routes}>
				<h2>Rutas disponibles</h2>
				{props.edit && (
					<Link href={"./add"} className={`${style.add} ${style.add__rutas}`}>
						<IoIosAdd />
					</Link>
				)}
				{rutas.map((datos, id_1) => {
					return <BotonRu key={id_1} datos={datos} />;
				})}
			</div>
		</>
	);
}
