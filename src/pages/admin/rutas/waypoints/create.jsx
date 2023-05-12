//React-Next
import dynamic from "next/dynamic";
import { useContext, useState } from "react";
import Link from "next/link";

//Componentes

import Layout from "@/layouts/Layout";
import NavBar from "@/components/common/NavBar";
import { IoIosArrowBack } from "react-icons/io";
import WaypointForm from "@/components/WaypointView/WaypointForm";

//Estilos
import styleN from "@/styles/Nav/NavStyle.module.css";

//Contextos

import MapContext from "@/contexts/Map.context";
import UserContext from "@/contexts/User.context";
import { createWaypoint_Request } from "@/api/waypoint.api";
import { useRouter } from "next/router";
import WaypointContext from "@/contexts/Waypoint.context";
import RutaContext from "@/contexts/Ruta.context";

const MapView = dynamic(() => import("@/components/MapView_Leaflet/MapView"), {
	ssr: false,
});

const MainMap = () => {
	//useContext

	const { editingRoute, setEditingRoute } = useContext(RutaContext);

	const router = useRouter();
	//useState

	const [isSubmiting, setIsSubmitin] = useState(false);

	const onSubmit = async (formData) => {
		if (isSubmiting) return;
		setIsSubmitin(true);
		console.log(formData);

		try {
			const newWaypoints = editingRoute?.waypoints
				? [...editingRoute.waypoints, formData]
				: [formData];

			console.log("anadido");
			setEditingRoute({ ...editingRoute, waypoints: newWaypoints });

			router.push("./");
		} catch (error) {
			console.log(error);
			setIsSubmitin(false);
		}
	};
	return (
		<Layout>
			<div className="AppView">
				{/* nav customizable */}

				<NavBar
					left={
						<>
							<div>
								<Link href={"./select"} className={styleN.btn_return}>
									<IoIosArrowBack />
									
								</Link>
							</div>
							<div className={styleN.title_nav}>
								<h2>Agregar parada</h2>
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
					<WaypointForm onSubmit={onSubmit} />
				</div>

				<div></div>
			</div>
		</Layout>
	);
};

export default MainMap;
