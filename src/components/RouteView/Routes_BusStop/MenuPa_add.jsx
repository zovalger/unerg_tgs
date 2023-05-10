import Link from "next/link";
import dynamic from "next/dynamic";
import { useContext } from "react";

//Estilos

import style from "../../../styles/Routes/routes_view.module.css";

// contextos


// Componentes

import BotonPa_add from "./BotonPa_add";

// import { Button } from "bootstrap";

import { IoIosAdd } from "react-icons/io";

export default function MenuPa_add() {
	return (
		<>
			<div className={style.container_routes}>
				<h2>Paradas</h2>

	
					<Link href={"./menu_paradas"} className={`${style.add} ${style.add__rutas}`}>
						<IoIosAdd />
					</Link>
	
					{/* <BotonPa_add 
					name={"Terminal"}
					/> */}

			</div>
		</>
	);
}
