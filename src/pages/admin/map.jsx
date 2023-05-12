// librerias y hooks
import { useContext, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

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

// my components
import ButtonFloatingContainer from "@/components/common/ButtonFloating_Container";
import NavBar from "@/components/common/NavBar";
import BotonRu from "@/components/RouteView/BotonRu";

//Layouts

import Layout from "@/layouts/Layout";

//Styles
import style from "@/styles/Routes/routes_view.module.css";
import styleN from "@/styles/Nav/NavStyle.module.css";

import UserContext from "@/contexts/User.context";
import { useRouter } from "next/router";

const MapView = dynamic(() => import("@/components/MapView_Leaflet/MapView"), {
	ssr: false,
});

const MainMap = () => {
	//useContext

	const { logout, user } = useContext(UserContext);

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

				<div>
					<Offcanvas isOpen={offcanvasActive} toggle={toggleOffcanvas}>
						<OffcanvasHeader
							toggle={toggleOffcanvas}
							className={styleN.header_nav}
						>
							<div className={styleN.user_container}>
								<div className={styleN.user__img}>
									<div className={styleN.container__img}>
										<Image
											src={"/User_icon.png"}
											height={400}
											width={400}
											alt="Perfil"
										/>
									</div>
								</div>

								<div className={styleN.user__info}>
									{user ? (
										<>
											<p>
												{user.name} {user.lastname}
											</p>
											<p>V-29.852.475</p>
											<p>{user.role}</p>
										</>
									) : (
										""
									)}
								</div>
							</div>
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

							{/************* Botones para navegar entre rutas ************/}

							<Link href={"./rutas/menu"} className={styleN.btn_nav}>
								<TbRoute className={styleN.route} />
								<p>Rutas</p>
							</Link>

							<Link href={"./paradas/menu"} className={styleN.btn_nav}>
								<GiBusStop className={styleN.route} />
								<p>Paradas</p>
							</Link>

							<Link href={"./autobuses/menu"} className={styleN.btn_nav}>
								<FaBusAlt className={styleN.route} />
								<p>Autobuses</p>
							</Link>

							<Link href={"./conductores/menu"} className={styleN.btn_nav}>
								<ImUsers className={styleN.route} />
								<p>Conductores</p>
							</Link>

							<Link href={"./map"} className={styleN.btn_nav}>
								<ImUser className={styleN.route} />
								<p>Administradores</p>
							</Link>

							<button
								className={styleN.btn_nav__logout}
								onClick={async () => {
									await logout();
								}}
							>
								<IoIosLogOut className={styleN.route} />
								<p>Salir</p>
							</button>
						</OffcanvasBody>
					</Offcanvas>
				</div>
			</div>
		</Layout>
	);
};

export default MainMap;
