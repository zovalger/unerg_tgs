//React-Next
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";

//Componentes

import Layout from "@/layouts/Layout";
import NavBar from "@/components/common/NavBar";
import { BiPencil } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import Bus_stop from "@/components/RouteView/bus_stop/Bus_stop";

//Estilos
import styleN from "../../../styles/Nav/NavStyle.module.css";

//Contextos

import MapContext from "@/contexts/Map.context";

import UserContext from "@/contexts/User.context";
import { getAllWaypoints_Request } from "@/api/waypoint.api";
import WaypointContext from "@/contexts/Waypoint.context";

const MapView = dynamic(() => import("@/components/MapView_Leaflet/MapView"), {
	ssr: false,
});

const MainMap = () => {
	//useContext
	const { user } = useContext(UserContext);

	const { getCoordsUser, insertWaypoint } = useContext(MapContext);
	const { setWaypoints, waypoints } = useContext(WaypointContext);

	//useState

	const [edit, setEdit] = useState(false);
	const getDataWaypoints = async () => {
		try {
			const { data } = await getAllWaypoints_Request();

			console.log(data);
			insertWaypoint(data);

			setWaypoints(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getDataWaypoints();
	}, []);

	const btn_edit = () => {
		setEdit(!edit);
	};

	return (
		<Layout>
			<div className="AppView">
				{/* nav customizable */}

					<NavBar
						left={
							<>
								<div>
					
									<Link className={styleN.btn_return} href={"../map"}>
                                       
										<IoIosArrowBack />
                                        
									</Link>
							
								</div>
								<div className={styleN.title_nav}>
								    <h2>Todas las paradas</h2>
								</div>
								{user
									? user.role == "admin" && (
											<div className={styleN.btn_edit} onClick={btn_edit}>
												<BiPencil />
											</div>
									  )
									: ""}
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
					<Bus_stop edit={edit} data={waypoints} />
				</div>

				<div></div>
			</div>
		</Layout>
	);
};

export default MainMap;
