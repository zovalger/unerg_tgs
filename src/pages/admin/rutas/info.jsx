//React-Next

import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";

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



const MapView = dynamic(() => import("@/components/MapView_Leaflet/MapView"), {
	ssr: false,
});

//**********************************  Codigo  ************************//

const MainMap = () => {
	//useContext
	
	

	return (
		<Layout>
			<div className="AppView">
				{/* nav customizable */}

				<NavBar
					left={
						<>
							<div>
								<Link className={styleN.btn_return} href={"./menu"}>
									<IoIosArrowBack />
								</Link>
							</div>
							<div className={styleN.title_nav}>
								<h2>Nombre de la ruta</h2>
							</div>
						</>
					}
					right={
					<>
						<div className={styleN.btn_edit} >
									<BiPencil />
								</div>
					</>}
				/>

				{/* Contenedor del mapa */}

				<div className={`${"MapView__Container"} ${"MapView__ContainerRu"}`}>
					<MapView />
				</div>


				<div className="container__rutas">

					<div className={style.container_routes}>

                        <BtnBus />
                        <BtnBus />
					
                        <HourBus />

                       <h2 style={{textAlign:"center",marginTop:"15px"}}>Paradas de autobus</h2>

                       {/** AGG componente que recorra las paradas **/}

					
					</div>
				</div>

			</div>
		</Layout>
	);
};

export default MainMap;