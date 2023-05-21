//React-Next
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/router";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

//Contextos

import MapContext from "@/contexts/Map.context";
import RutaContext from "@/contexts/Ruta.context";

//Componentes

import Layout from "@/layouts/Layout";
import NavBar from "@/components/common/NavBar";
import { IoIosAdd, IoIosArrowBack } from "react-icons/io";
import MenuPa_add from "@/components/RouteView/Routes_BusStop/MenuPa_add";
import BotonPa_add from "@/components/RouteView/Routes_BusStop/BotonPa_add";
import WaypointDraggable from "@/components/RouteView/WaypointDraggable";

//Estilos
import styleN from "@/styles/Nav/NavStyle.module.css";
import style from "@/styles/Routes/routes_view.module.css";

const MapView = dynamic(() => import("@/components/MapView_Leaflet/MapView"), {
	ssr: false,
});

const MainMap = () => {
	const router = useRouter();

	//useContext
	const { insertWaypoint, insertRuta } = useContext(MapContext);
	const { editingRoute, setEditingRoute } = useContext(RutaContext);

	useEffect(() => {
		updateMap();
	}, []);

	const updateMap = (r = null) =>
		setTimeout(() => {
			if (r) {
				const { waypoints } = r;
				insertWaypoint(waypoints);
				insertRuta([r]);
			} else {
				insertWaypoint(editingRoute?.waypoints);
				insertRuta([editingRoute]);
			}
		}, 200);

	const onEdit = (index) => {
		router.push(`./waypoints/${index}`);
	};

	const onDelete = (index) => {
		console.log("borrar", index);

		console.log(editingRoute.waypoints);

		const w = editingRoute.waypoints.filter((item, i) => index != i);
		console.log(w);

		setEditingRoute({ ...editingRoute, waypoints: w });

		updateMap({ ...editingRoute, waypoints: w });
	};

	//useState

	const reorder = (list, startIndex, endIndex) => {
		const result = [...list];
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);

		return result;
	};

	const onDragEnd = (result) => {
		const { source, destination } = result;

		if (!destination) return;

		if (
			source.index == destination.index &&
			source.droppableId == destination.droppableId
		)
			return;

		const w = reorder(editingRoute.waypoints, source.index, destination.index);

		console.log(w);
		setEditingRoute((r) => ({
			...editingRoute,
			waypoints: w,
		}));
	};

	return (
		<Layout>
			<div className="AppView">
				{/* nav customizable */}

				<NavBar
					left={
						<>
							<div>
								<Link href={"./"} className={styleN.btn_return}>
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
					{/* <MenuPa_add /> */}

					<div className={style.container_routes}>
						<h2>Paradas</h2>

						{editingRoute?.waypoints?.map((w, index) => (
							<WaypointDraggable
								data={w}
								index={index}
								key={uuid()}
								onDelete={onDelete}
								onEdit={onEdit}
							/>
						))}
					</div>

					<Link
						href={"./waypoints/select"}
						className={`${style.add} ${style.add__rutas}`}
					>
						<IoIosAdd />
					</Link>
				</div>
			</div>
		</Layout>
	);
};

export default MainMap;
