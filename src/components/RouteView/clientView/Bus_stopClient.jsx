import Link from "next/link";
import dynamic from "next/dynamic";
import { useContext } from "react";

//Estilos

import style from "@/styles/Routes/routes_view.module.css";

// contextos

import MapContext from "@/contexts/Map.context";

// Componentes
import BotonPaClient from "./BotonPaClient";
import ToastContext from "@/contexts/Toast.context";
import { v4 as uuid } from "uuid";

export default function Bus_stopClient({ data }) {
	const {
		setCenterMap,
		getCoordsDevice,
		insertRuta,
		setUserCoord,
		toogleViewUserCoord,
	} = useContext(MapContext);
	const { showErrorToast } = useContext(ToastContext);

	return (
		<>
			<div className={style.container_routes}>
				<h2>Paradas</h2>

				{data.map((w) => (
					<BotonPaClient
						data={w}
						key={w._id}
						onClick={async () => {
							const coordDevice = await getCoordsDevice();

							if (!coordDevice)
								return showErrorToast(
									"No se pudo obtener la ubicacion del dispositivo"
								);

							setUserCoord(coordDevice);
							toogleViewUserCoord(true);

							insertRuta([
								{
									_id: uuid(),
									status: "a",
									waypoints: [{ coord: coordDevice }, { coord: w.coord }],
								},
							]);

							setTimeout(() => {
								setCenterMap(coordDevice, 16);
							}, 1000);
						}}
					/>
				))}
			</div>
		</>
	);
}
