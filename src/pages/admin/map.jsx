// librerias y hooks
import { useContext, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// componentes de otras librerias
import { GoLocation } from "react-icons/go";
import { TbRoute } from "react-icons/tb";
import { RxHamburgerMenu } from "react-icons/rx";
import { GiBusStop } from "react-icons/gi";
import { IoIosLogOut } from "react-icons/io";
import { FaBusAlt } from "react-icons/fa";
import { ImUsers, ImUser } from "react-icons/im";

import { Button, Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";

// contextos
import MapContext from "@/contexts/Map.context";
import UserContext from "@/contexts/User.context";

// my components
import ButtonFloatingContainer from "@/components/common/ButtonFloating_Container";
import NavBar from "@/components/common/NavBar";
import BotonRu from "@/components/RouteView/BotonRu";

//Layouts

import Layout from "@/layouts/Layout";

//Styles
import style from "@/styles/Routes/routes_view.module.css";
import styleN from "@/styles/Nav/NavStyle.module.css";
import AsidePanel from "@/components/common/AsidePanel";

const MapView = dynamic(() => import("@/components/MapView_Leaflet/MapView"), {
	ssr: false,
});

const MainMap = () => {
	//useContext

	// const { logout, user } = useContext(UserContext);

	const { toogleViewUserCoord, getCoordsUser, viewUserCoord, Rutas } =
		useContext(MapContext);

	//useState

	const [offcanvasActive, setOffcanvasActive] = useState(false);
	const toggleOffcanvas = () => setOffcanvasActive(!offcanvasActive);

	const [ro_active, setRo_active] = useState(false);
	const Ro_Btn = () => setRo_active(!ro_active);

	return (
		<Layout>
			<div className="AppView">
				{/* nav customizable */}

				<NavBar
					title={"UNERG-TGS"}
					ViPrincipal={true}
					left={
						<div onClick={toggleOffcanvas} className={styleN.HamburgerMenu}>
							<RxHamburgerMenu />
						</div>
					}
					right={<></>}
				/>

				{/* Contenedor del mapa */}

				<div
					className="MapView__Container"
					onClick={() => {
						setRo_active(false);
					}}
				>
					<MapView />

					{/*Contenedor desplegable de las rutas*/}

					{ro_active ? (
						<div className={style.Route_view}>
							<h2>Rutas</h2>
							{Rutas.map((datos, id_1) => {
								return <BotonRu key={id_1} datos={datos} />;
							})}
						</div>
					) : undefined}
				</div>

				{/* botones inferiores */}

				<ButtonFloatingContainer>
					<Button color="primary">
						<TbRoute onClick={Ro_Btn} />
					</Button>

					{/* boton para obtener las coordenadas del usuario y mostrarla en el mapa */}
					<Button
						color="primary"
						onClick={() => {
							// si esta en true se va a desactivar
							if (viewUserCoord) {
								toogleViewUserCoord(false);
							} else {
								toogleViewUserCoord(true);
								getCoordsUser();
							}
						}}
					>
						<GoLocation />
					</Button>
				</ButtonFloatingContainer>

				{/* panel lateral desplegable */}

				<AsidePanel
					toggleOffcanvas={toggleOffcanvas}
					offcanvasActive={offcanvasActive}
				/>
			</div>
		</Layout>
	);
};

export default MainMap;
