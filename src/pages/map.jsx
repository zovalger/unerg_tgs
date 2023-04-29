// librerias y hooks
import { useContext, useState } from "react";
import dynamic from "next/dynamic";

// componentes de otras librerias
import { GoLocation } from "react-icons/go";
import { TbRoute } from "react-icons/tb";
import { RxHamburgerMenu } from "react-icons/rx";
import { BiLeftArrow } from "react-icons/bi";
import { GiBusStop } from "react-icons/gi";

import { Button, Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";

// contextos
import MapContext from "@/contexts/MapContext";

// my components
import ButtonFloatingContainer from "@/components/common/ButtonFloating_Container";
import NavBar from "@/components/common/NavBar";
import Routes from "@/components/RouteView/Routes";
import BotonRu from "@/components/RouteView/BotonRu";
import Bus_stop from "@/components/RouteView/bus_stop/Bus_stop";

//Layouts

import Layout from "@/layouts/layout";

//Styles
import style from "@/styles/Routes/routes_view.module.css";
import styleN from "@/styles/Nav/NavStyle.module.css";

import { set } from "mongoose";

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

	const [offcanvasActive, setOffcanvasActive] = useState(false);
	const toggleOffcanvas = () => setOffcanvasActive(!offcanvasActive);

	const [ro_active, setRo_active] = useState(false);

	const Ro_Btn = () => setRo_active(!ro_active);

	//Vista de las rutas

	const [ro_menu, setRo_menu] = useState(false);

	const active_RoM = () => {
		setRo_menu(!ro_menu);
		setOffcanvasActive(false);
		setRo_active(false);
	};

	//Vista de las paradas

	const [pa_menu, setPa_menu] = useState(false);

	const active_PaM = () => {
		setPa_menu(!pa_menu);
		setOffcanvasActive(false);
		setRo_active(false);
	};

	//Cerrar vistas

	const close = () => {
		setRo_menu(false);
		setPa_menu(false);
	};

	return (
		<Layout>
			<div className="AppView">
				{/* nav customizable */}
				{ro_menu || pa_menu ? (
					<NavBar
						left={
							<>
								<div onClick={close}>
									<div className={style.btn_return}>
										<BiLeftArrow />
									</div>
								</div>
								{ro_menu && <h2>Todas las rutas</h2>}
								{pa_menu && <h2>Todas las paradas</h2>}
							</>
						}
						right={<></>}
					/>
				) : (
					<NavBar
						left={
							<div onClick={toggleOffcanvas}>
								<RxHamburgerMenu />
							</div>
						}
						title={"Vista de mapa"}
						right={<></>}
					/>
				)}

				{/* contenedor del mapa */}

				<div
					className={`${"MapView__Container"} ${
						ro_menu ? "MapView__ContainerRu" : ""
					}`}
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
				{/*Abrir vista de rutas*/}
				{ro_menu && (
					<div className="container__rutas">
						<Routes />
					</div>
				)}

				{/*Abrir vista de paradas*/}

				{pa_menu && (
					<div className="container__rutas">
						<Bus_stop />
					</div>
				)}

				{/* botones inferiores */}

				{!ro_menu && !pa_menu && (
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
				)}

				{/* panel lateral desplegable */}

				<div>
					<Offcanvas isOpen={offcanvasActive} toggle={toggleOffcanvas}>
						<OffcanvasHeader
							toggle={toggleOffcanvas}
							className={styleN.header_nav}
						>
							<h2>UNERG-TGS</h2>
						</OffcanvasHeader>
						<OffcanvasBody style={{ padding: 0 }}>
							<button
								className={styleN.btn_nav}
								onClick={() => {
									// si esta en true se va a desactivar
									if (viewUserCoord) {
										toogleViewUserCoord(false);
									} else {
										toogleViewUserCoord(true);
										getCoordsUser();
										setOffcanvasActive(!offcanvasActive);
									}
								}}
							>
								<GoLocation className={styleN.route} />
								<p>Mi Ubicación</p>
							</button>

							<button onClick={active_RoM} className={styleN.btn_nav}>
								<TbRoute className={styleN.route} />
								<p>Rutas</p>
							</button>

							<button onClick={active_PaM} className={styleN.btn_nav}>
								<GiBusStop className={styleN.route} />
								<p>Paradas</p>
							</button>
						</OffcanvasBody>
					</Offcanvas>
				</div>
			</div>
		</Layout>
	);
};

export default MainMap;
