// librerias y hooks
import { useContext, useState } from "react";
import dynamic from "next/dynamic";

// componentes de otras librerias

import { BiLeftArrow, BiPencil } from "react-icons/bi";

import { Button, Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";

// contextos
import MapContext from "@/contexts/MapContext";

// my components
import ButtonFloatingContainer from "@/components/common/ButtonFloating_Container";
import NavBar from "@/components/common/NavBar";

//Layouts

import Layout from "@/layouts/Layout";

//Styles
import style from "@/styles/Routes/routes_view.module.css";
import styleN from "@/styles/Nav/NavStyle.module.css";

import UserContext from "@/contexts/UserProvider";
import { useRouter } from "next/router";
import Edit from "@/components/RouteView/edit/Edit";

const MapView = dynamic(() => import("@/components/MapView_Leaflet/MapView"), {
	ssr: false,
});

const MainMap = () => {
	const {
		toogleViewUserCoord,
		getCoordsUser,
		viewUserCoord,
		getCenterMap,
		insertWaypoint,
		clearWaypoint,
		updateBus,
		insertBus,
		clearBuses,
		insertRuta,
		clearRutas,
		Rutas,
	} = useContext(MapContext);
	const router = useRouter();

	return (
		<Layout>
			<div className="AppView">
				{/* nav customizable */}

				<NavBar
					left={
						<>
							<div>
								<div
									className={styleN.btn_return}
									onClick={() => router.push(`/admin/map`)}
								>
									<BiLeftArrow />
								</div>
							</div>
							<div className={styleN.title_nav}>
								<h2>Edición de paradas</h2>
							</div>
						</>
					}
					right={<></>}
				/>

				{/* Contenedor del mapa */}

				<div className={`${"MapView__Container"} ${"MapView__ContainerRu"}`}>
					<MapView />
				</div>

				<div className="container__rutas">
					<Edit />
				</div>
			</div>
		</Layout>
	);
};

export default MainMap;
