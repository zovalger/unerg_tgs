//React-Next
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";

//Componentes

import Layout from "@/layouts/Layout";
import NavBar from "@/components/common/NavBar";
import Bus_stop from "@/components/RouteView/bus_stop/Bus_stop";

import { BiPencil } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";

//Estilos

import styleN from "@/styles/Nav/NavStyle.module.css";

//Contextos

import MapContext from "@/contexts/Map.context";

import UserContext from "@/contexts/User.context";
import {
	deleteWaypoint_Request,
	getAllWaypoints_Request,
} from "@/api/waypoint.api";
import WaypointContext from "@/contexts/Waypoint.context";
import AsidePanel from "@/components/common/AsidePanel";
import { RxHamburgerMenu } from "react-icons/rx";

const MapView = dynamic(() => import("@/components/MapView_Leaflet/MapView"), {
	ssr: false,
});

const MainMap = () => {
	//useContext
	const { user } = useContext(UserContext);

	const { insertWaypoint, setCenterMap } = useContext(MapContext);
	const { insert, waypoints, getWaypoint, dropWaypoint } =
		useContext(WaypointContext);

	//useState
	const [offcanvasActive, setOffcanvasActive] = useState(false);
	const toggleOffcanvas = () => setOffcanvasActive(!offcanvasActive);

	const [edit, setEdit] = useState(false);
	const getDataWaypoints = async () => {
		try {
			const { data } = await getAllWaypoints_Request();

			console.log(data);
			insertWaypoint(data);

			insert(data);
		} catch (error) {
			console.log(error);
		}
	};

	const onClick = (_id) => {
		const w = getWaypoint(_id);
		setCenterMap(w.coord, 15);
	};

	const onDelete = async (_id) => {
		try {
			const msg = `Seguro que quiere eliminar la parada ${
				getWaypoint(_id).name
			}`;

			const confirm = window.confirm(msg);

			if (confirm) {
				const res = await deleteWaypoint_Request(_id);
				if (res.data.status == "d") {
					const newSet = dropWaypoint(_id);
					insertWaypoint(newSet);
				}
			}
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
							{user && (user.role == "admin" || user.role == "root") ? (
								<div className={styleN.btn_edit} onClick={btn_edit}>
									<BiPencil />
								</div>
							) : null}
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
					<Bus_stop
						edit={edit}
						data={waypoints}
						onDelete={onDelete}
						onClick={onClick}
					/>
				</div>
			</div>

			<AsidePanel
				toggleOffcanvas={toggleOffcanvas}
				offcanvasActive={offcanvasActive}
			/>
		</Layout>
	);
};

export default MainMap;
