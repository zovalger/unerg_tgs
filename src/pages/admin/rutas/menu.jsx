//React-Next
import dynamic from "next/dynamic";
import { useContext, useState } from "react";
import Link from "next/link";

//Componentes

import Layout from "@/layouts/Layout";
import NavBar from "@/components/common/NavBar";
import { IoIosArrowBack } from "react-icons/io";
import Routes from "@/components/RouteView/Routes";

//Estilos
import styleN from "../../../styles/Nav/NavStyle.module.css";

//Contextos

import MapContext from "@/contexts/Map.context";

import UserContext from "@/contexts/User.context";

const MapView = dynamic(() => import("@/components/MapView_Leaflet/MapView"), {
	ssr: false,
});

const MainMap = () => {
	//useContext
	const { logout, user } = useContext(UserContext);

	const {
		toogleViewUserCoord,
		getCoordsUser,
		viewUserCoord,

		Rutas,
	} = useContext(MapContext);

	//useState

	const [edit, setEdit] = useState(false);

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
								<h2>Todas las Rutas</h2>
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
					<Routes edit={true} />
				</div>

				<div></div>
			</div>
		</Layout>
	);
};

export default MainMap;
