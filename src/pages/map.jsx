// librerias y hooks
import { useContext, useState } from "react";
import dynamic from "next/dynamic";

// componentes de otras librerias
import { GoLocation } from "react-icons/go";
import { TbRoute } from "react-icons/tb";
import { RxHamburgerMenu } from "react-icons/rx";
import { BiLeftArrow } from "react-icons/bi";

import { Button, Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";

// contextos
import MapContext from "@/contexts/MapContext";

// my components
import ButtonFloatingContainer from "@/components/common/ButtonFloating_Container";
import NavBar from "@/components/common/NavBar";
import Routes from "../components/RouteView/Routes";

import style from "../styles/Routes/routes_view.module.css";
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
	} = useContext(MapContext);

	const [offcanvasActive, setOffcanvasActive] = useState(false);
	const toggleOffcanvas = () => setOffcanvasActive(!offcanvasActive);

	const [ro_active, setRo_active] = useState(false);

	const Ro_Btn = () => setRo_active(!ro_active);

	const [ro_menu, setRo_menu] = useState(false);

	const active_RoM = () => {
		setRo_menu(!ro_menu);
		setOffcanvasActive(!offcanvasActive);
	};

	return (
		<div className="AppView">
			{/* nav customizable */}
			{ro_menu ? (
				<NavBar
					left={
						<div onClick={() => setRo_menu(false)}>
							<BiLeftArrow />
						</div>
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
				className={ro_menu ? "MapView__ContainerRu" : "MapView__Container"}
				onClick={() => {
					setRo_active(false);
				}}
			>
				<MapView />

				{/*Contenedor de las rutas*/}

				{ro_active ? (
					<div className={style.Route_view}>
						<h2>Rutas</h2>
						<ul>
							{/*Aqui ira un map para el componente de la lista de rutas*/}
							<li>Ruta1</li>
							<li>Ruta2</li>
							<li>Ruta3</li>
							<li>Ruta4</li>
							<li>Ruta1</li>
							<li>Ruta2</li>
							<li>Ruta3</li>
							<li>Ruta4</li>
							<li>Ruta1</li>
							<li>Ruta2</li>
							<li>Ruta3</li>
							<li>Ruta4</li>
						</ul>
					</div>
				) : undefined}
			</div>

			{ro_menu && (
				<div className="container__rutas">
					<Routes />
				</div>
			)}

			{/* botones inferiores */}

			{!ro_menu && (
				<ButtonFloatingContainer>
					<Button onClick={() => clearRutas()}>CR</Button>
					<Button
						onClick={() =>
							insertRuta({
								_id: "23",
								name: "terminal centro",
								description: "pequena descripsion de la ruta",
								color: "#15f7f7",
								state: "a",
								waypoints: [
									{ lat: 9.893479127907723, lng: -67.38630115985872 },
									{ lat: 9.89664989850226, lng: -67.39130616188051 },
									{ lat: 9.90058161152193, lng: -67.39688515663148 },
									{ lat: 9.917470531072166, lng: -67.36860930919649 },
									{ lat: 9.918379421974224, lng: -67.36763030290605 },
									{ lat: 9.928799781647307, lng: -67.35660910606386 },
									{ lat: 9.93310098959258, lng: -67.35528677701951 },
									{ lat: 9.93858574029869, lng: -67.36102670431139 },
								],
								idTimetable: "objectId(Ruta_Timetable)",
							})
						}
					>
						IR
					</Button>

					<Button onClick={() => clearBuses()}>CB</Button>
					<Button
						onClick={() =>
							updateBus({
								_id: "3",
								idRuta: "1",
								capacity: 0.5,
								state: "a",
								coord: getCenterMap(),
								name: "Bus 001",
								num: "000",
								placa: "ab00",
							})
						}
					>
						UB
					</Button>

					<Button
						onClick={() => {
							clearWaypoint();
						}}
					>
						CW
					</Button>

					<Button
						onClick={() => {
							const w = {
								_id: "1",
								name: "parada 1",
								type: "p",
								state: "a",
								coord: { lat: 9.9030296, lng: -67.3761181 },
							};

							w.coord = getCenterMap();

							insertWaypoint(w);
						}}
					>
						W
					</Button>
					<Button
						onClick={() => {
							console.log(getCenterMap());
						}}
					>
						c
					</Button>

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
					<OffcanvasHeader toggle={toggleOffcanvas}>Offcanvas</OffcanvasHeader>
					<OffcanvasBody>
						<button onClick={active_RoM}>Rutas</button>
					</OffcanvasBody>
				</Offcanvas>
			</div>
		</div>
	);
};

export default MainMap;
