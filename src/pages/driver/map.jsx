// librerias y hooks
import { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link"

// componentes de otras librerias

import { RxHamburgerMenu } from "react-icons/rx";
import { TbBus } from "react-icons/tb";
import { GrChatOption } from "react-icons/gr"
import { IoIosLogOut } from "react-icons/io";

import {
	Button,
	Container,
	Offcanvas,
	OffcanvasBody,
	OffcanvasHeader,
} from "reactstrap";

import { FaBusinessTime } from "react-icons/fa";

// contextos
import MapContext from "@/contexts/Map.context";

// my components
import NavBar from "@/components/common/NavBar";

//Layouts

import Layout from "@/layouts/Layout";

//Styles
import style from "@/styles/Users/driver/driver.module.css";
import styleN from "@/styles/Nav/NavStyle.module.css";

import UserContext from "@/contexts/User.context";
import DriverContext from "@/contexts/Driver.context";
import AsidePanel from "@/components/common/AsidePanel";

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
					ViPrincipal={true}
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
				<AsidePanel
					toggleOffcanvas={toggleOffcanvas}
					offcanvasActive={offcanvasActive}
				>
					<button className={styleN.btn_nav}
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
						<FaBusinessTime className={styleN.route} />
						<p>Iniciar servicio</p>
					</button>
				</AsidePanel>
			</div>
		</Layout>
	);
};

export default DriveMap;
