import Link from "next/link";
import dynamic from "next/dynamic";
import { useContext } from "react";

//Estilos

import style from "../../../styles/Routes/routes_view.module.css";

// contextos

import MapContext from "@/contexts/Map.context";

// Componentes
import BotonPa from "./BotonPa";
import BotonPa_edit from "./BotonPa _edit";
// import { Button } from "bootstrap";

import { IoIosAdd } from "react-icons/io";

export default function Bus_stop({ edit, data, onDelete }) {
	return (
		<>
			<div className={style.container_routes}>
				<h2>Paradas</h2>

				{edit && (
					<Link href={"./add"} className={style.add}>
						<IoIosAdd />
					</Link>
				)}

				{data.map((w) =>
					edit ? (
						<BotonPa_edit data={w} key={w._id} onDelete={onDelete} />
					) : (
						<BotonPa data={w} key={w._id} />
					)
				)}
			</div>
		</>
	);
}
