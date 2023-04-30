// librerias y hooks
import { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

// componentes de otras librerias

import { RxHamburgerMenu } from "react-icons/rx";
import { TbBus } from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";

import {
	Button,
	Container,
	Offcanvas,
	OffcanvasBody,
	OffcanvasHeader,
} from "reactstrap";

// contextos
import MapContext from "@/contexts/MapContext";

// my components
import NavBar from "@/components/common/NavBar";

//Layouts

import Layout from "@/layouts/Layout";

//Styles
import style from "@/styles/Users/driver/driver.module.css";
import styleN from "@/styles/Nav/NavStyle.module.css";

import UserContext from "@/contexts/UserProvider";
import DriverContext from "@/contexts/Driver.context";

const MapView = dynamic(() => import("@/components/MapView_Leaflet/MapView"), {
	ssr: false,
});

const DriveMap = () => {
	const { logout, user } = useContext(UserContext);
	const { sendCoord } = useContext(DriverContext);

	const [inter, setInter] = useState(null);

	const {
		getCenterMap,
		toogleViewUserCoord,
		getCoordsUser,
		viewUserCoord,
		updateBus,
		insertRuta,
		Rutas,
	} = useContext(MapContext);

	//useState
	const [offcanvasActive, setOffcanvasActive] = useState(false);
	const toggleOffcanvas = () => setOffcanvasActive(!offcanvasActive);

	return (
		<Layout>
			<div className="AppView">
				{/* nav customizable */}
				<NavBar
					title={"UNERG-TGS"}
					left={
						<div onClick={toggleOffcanvas}>
							<RxHamburgerMenu />
						</div>
					}
					right={<></>}
				/>

				{/* contenedor del mapa */}

				<div className={`${"MapView__Container"} ${style.map}`}>
					<MapView />
				</div>

				<div className={style.menu}>
					<div className={style.left}>
						<h2>45%</h2>{" "}
						{/*Remplazar con valor actulizable  // {actualizable}%*/}
						<TbBus className={style.bus} />
					</div>

					<div className={style.right}>
						<div className={style.porcentaje}></div>
					</div>
				</div>

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
							<button className={styleN.btn_nav}>
								<TbBus className={styleN.route} />
								<p>Rutas</p>
							</button>

							<button
								onClick={() => {
									setInter(
										setInterval(() => {
											const coord = getCenterMap();
											console.log(coord);
											sendCoord(coord);
										}, 500)
									);
								}}
							>
								iniciar servicio
							</button>

							<button
								className={styleN.btn_nav__logout}
								onClick={async () => {
									clearInterval(inter);
									await logout();
									// router.push("/login");
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

export default DriveMap;
