//React-Next

import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/router";

//Componentes

import Layout from "@/layouts/Layout";
import NavBar from "@/components/common/NavBar";
import BtnBus from "@/components/RouteView/infoBus/BtnBus";
import HourBus from "@/components/RouteView/infoBus/HourBus";

import { IoIosArrowBack } from "react-icons/io";
import { BiPencil } from "react-icons/bi";

//Estilos

import styleN from "@/styles/Nav/NavStyle.module.css";
import style from "@/styles/Routes/routes_view.module.css";

//Contextos

import MapContext from "@/contexts/Map.context";
import RutaContext from "@/contexts/Ruta.context";
import BotonPa from "@/components/RouteView/bus_stop/BotonPa";
import BusContext from "@/contexts/Bus.context";
import {
	getRuta_By_Id_Request,
	getTimetable_By_Id_Request,
} from "@/api/public.api";

const MapView = dynamic(() => import("@/components/MapView_Leaflet/MapView"), {
	ssr: false,
});

//**********************************  Codigo  ************************//

const RutaOverview = () => {
	const router = useRouter();
	const { _id } = router.query;

	const { getRuta, insertRuta, setEditingRoute } = useContext(RutaContext);
	const { getBuses_by_RutaId } = useContext(BusContext);

	const [timetable, setTimetable] = useState(null);

	const {
		insertRuta: insertRutaMap,
		insertWaypoint: insertWaypointMap,
		insertBus: insertBusMap,
		clearWaypoint,
		clearRutas,
	} = useContext(MapContext);

	const data = getRuta(_id);

	useEffect(() => {
		if (!data) {
			if (_id)
				getRuta_By_Id_Request(_id)
					.then(({ data }) => {
						insertRuta([data]);
						insertRutaMap([data]);
						insertWaypointMap(data.waypoints);
					})
					.catch((error) => console.log(error));
		} else {
			insertRutaMap([data]);
			insertWaypointMap(data.waypoints);
		}

		insertBusMap(getBuses_by_RutaId(_id));

		if (_id && data)
			getTimetable_By_Id_Request(data.timetableId)
				.then(({ data }) => setTimetable(data))
				.catch((error) => console.log(error));
	}, []);

	const onClick = (_id) => {
		console.log(_id);
	};

	const restore = () => {
		clearWaypoint();
		clearRutas();
	};

	return (
		<Layout>
			<div className="AppView">
				{/* nav customizable */}

				<NavBar
					left={
						<>
							<div>
								<Link
									className={styleN.btn_return}
									href={"./menu"}
									onClick={() => {
										restore();
									}}
								>
									<IoIosArrowBack />
								</Link>
							</div>
							<div className={styleN.title_nav}>
								<h2>{data && data.name}</h2>
							</div>
						</>
					}
				/>

				{/* Contenedor del mapa */}

				<div className={`${"MapView__Container"} ${"MapView__ContainerRu"}`}>
					<MapView />
				</div>

				<div className="container__rutas">
					<div className={style.container_routes}>
						{getBuses_by_RutaId(_id).map((b) => (
							<BtnBus key={b._id} data={b} />
						))}

						{timetable && <HourBus data={timetable} />}
						<h2 style={{ textAlign: "center", marginTop: "15px" }}>
							Paradas de autobus
						</h2>
						{data &&
							data.waypoints.map((w) => (
								<BotonPa data={w} key={uuid()} onClick={onClick} />
							))}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default RutaOverview;