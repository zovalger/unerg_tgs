import Link from "next/link";
import dynamic from "next/dynamic";
import { useContext } from "react";

//Estilos

import style from "@/styles/Routes/routes_view.module.css";

// contextos

import MapContext from "@/contexts/Map.context";

// Componentes
import BotonPaClient from "./BotonPaClient";


export default function Bus_stopClient({  data  }) {
	return (
		<>
			<div className={style.container_routes}>
				<h2>Paradas</h2>

				{data.map((w) =>
					
						<BotonPaClient data={w} key={w._id} />
					
				)}
			</div>
		</>
	);
}
