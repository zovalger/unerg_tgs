import Link from "next/link";
import dynamic from "next/dynamic";
import { useContext } from "react";

//Estilos

import style from "@/styles/Routes/routes_view.module.css";

// contextos

// Componentes

import BotonPa_add from "./BotonPa_add";

// import { Button } from "bootstrap";

import { IoIosAdd } from "react-icons/io";
import RutaContext from "@/contexts/Ruta.context";

export default function MenuPa_add() {
	const { editingRoute } = useContext(RutaContext);

	return (
		<>
			<div className={style.container_routes}>
				<h2>Paradas</h2>

				{editingRoute?.waypoints?.map((w) => (
					<BotonPa_add data={w} key={w._id || w.name} />
				))}

				<Link
					href={"./waypoints/select"}
					className={`${style.add} ${style.add__rutas}`}
				>
					<IoIosAdd />
				</Link>
			</div>
		</>
	);
}
