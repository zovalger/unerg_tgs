//React-Next
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";

//Componentes

import Layout from "@/layouts/Layout";
import NavBar from "@/components/common/NavBar";
import { IoIosArrowBack } from "react-icons/io";
import MenuPa_add from "@/components/RouteView/Routes_BusStop/MenuPa_add";

//Estilos
import styleN from "../../../../styles/Nav/NavStyle.module.css";

//Contextos

import MapContext from "@/contexts/Map.context";

import {
	deleteWaypoint_Request,
	getAllWaypoints_Request,
} from "@/api/waypoint.api";
import WaypointContext from "@/contexts/Waypoint.context";

const MapView = dynamic(() => import("@/components/MapView_Leaflet/MapView"), {
	ssr: false,
});

const MainMap = () => {

	//useContext
	

	const { insertWaypoint, setCenterMap } = useContext(MapContext);
	const { insert, waypoints, getWaypoint, dropWaypoint } =
		useContext(WaypointContext);


	//useState


	
	return (
		<Layout>
			<div className="AppView">
				{/* nav customizable */}

				<NavBar
					left={
						<>
							<div>
								<Link href={"../add"} className={styleN.btn_return}>
									<IoIosArrowBack />
								</Link>
							</div>
							<div className={styleN.title_nav}>
								<h2>Edición de ruta</h2>
							</div>
						</>
					}
					right={<></>}
				/>

				{/* Contenedor del mapa */}

				<div className={`${"MapView__Container"} ${"MapView__ContainerRu"}`}>
					<MapView />
				</div>

				{/*Abrir vista de paradas*/}

				<div className="container__rutas">
					<MenuPa_add/>
				</div>

			</div>
		</Layout>
	);
};

export default MainMap;
