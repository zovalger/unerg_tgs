//React-Next
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";

//Componentes

import Layout from "@/layouts/Layout";
import NavBar from "@/components/common/NavBar";
import { IoIosArrowBack } from "react-icons/io";
import WaypointForm from "@/components/WaypointView/WaypointForm";

//Estilos
import styleN from "@/styles/Nav/NavStyle.module.css";

//Contextos

import { useRouter } from "next/router";
import RutaContext from "@/contexts/Ruta.context";

const MapView = dynamic(() => import("@/components/MapView_Leaflet/MapView"), {
	ssr: false,
});

const MainMap = () => {
	//useContext

	const { editingRoute, setEditingRoute } = useContext(RutaContext);

	const router = useRouter();
	const { indexWaypoint, _id } = router.query;

	
	useEffect(() => {
		if (!editingRoute) router.push("/admin/rutas/menu");
	}, []);


	//useState

	const [isSubmiting, setIsSubmitin] = useState(false);

	const onSubmit = async (formData) => {
		if (isSubmiting) return;
		setIsSubmitin(true);
		console.log(formData);

		try {
			let newWaypoints = editingRoute?.waypoints ? editingRoute.waypoints : [];

			if (formData._id)
				newWaypoints = newWaypoints.map((w) =>
					w._id == formData._id ? formData : w
				);
			else newWaypoints[indexWaypoint] = formData;

			console.log("anadido");
			setEditingRoute({ ...editingRoute, waypoints: newWaypoints });

			router.push(`../../${_id}/waypoints/`);
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
								<Link
									href={`../../${_id}/waypoints/`}
									className={styleN.btn_return}
								>
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
					<WaypointForm
						onSubmit={onSubmit}
						data={editingRoute?.waypoints[indexWaypoint]}
					/>
				</div>

				<div></div>
			</div>
		</Layout>
	);
};

export default MainMap;
