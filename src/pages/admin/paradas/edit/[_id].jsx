//React-Next
import dynamic from "next/dynamic";
import { useContext, useState } from "react";
import Link from "next/link";

//Componentes

import Layout from "@/layouts/Layout";
import NavBar from "@/components/common/NavBar";
import { BiLeftArrow, BiPencil } from "react-icons/bi";
import WaypointForm from "@/components/WaypointView/WaypointForm";

//Estilos
import styleN from "@/styles/Nav/NavStyle.module.css";

//Contextos
import {
	createWaypoint_Request,
	updateWaypoint_Request,
} from "@/api/waypoint.api";
import WaypointContext from "@/contexts/Waypoint.context";
import { useRouter } from "next/router";
import MapContext from "@/contexts/Map.context";

const MapView = dynamic(() => import("@/components/MapView_Leaflet/MapView"), {
	ssr: false,
});

const MainMap = () => {
	const router = useRouter();
	//useContext

	const { getWaypoint, updateWaypoint } = useContext(WaypointContext);
	const { insertWaypoint } = useContext(MapContext);
	const { _id } = router.query;

	console.log(_id);
	//useState

	const [edit, setEdit] = useState(false);

	const btn_edit = () => {
		setEdit(!edit);
	};

	const [isSubmiting, setIsSubmitin] = useState(false);

	const onSubmit = async (formData) => {
		console.log(formData);
		if (isSubmiting) return;
		setIsSubmitin(true);

		try {
			const res = await updateWaypoint_Request(_id, formData);
			console.log(res);

			const w = res.data;

			const newSet = updateWaypoint(w);

			insertWaypoint(newSet);

			router.back();
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
								<Link href={"../menu"} className={styleN.btn_return}>
									<BiLeftArrow />
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
					<WaypointForm onSubmit={onSubmit} data={getWaypoint(_id)} />
				</div>

				<div></div>
			</div>
		</Layout>
	);
};

export default MainMap;
