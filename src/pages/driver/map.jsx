// librerias y hooks
import { useContext, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

// componentes de otras librerias

import { RxHamburgerMenu } from "react-icons/rx";
import { TbBus } from "react-icons/tb"

import { Button, Container, Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";

// contextos
import MapContext from "@/contexts/MapContext";

// my components
import NavBar from "@/components/common/NavBar";


//Layouts

import Layout from "@/layouts/layout";


//Styles
import style from "@/styles/Users/driver/driver.module.css";
import styleN from "@/styles/Nav/NavStyle.module.css"

import { set } from "mongoose";

const MapView = dynamic(() => import("@/components/MapView_Leaflet/MapView"), {
	ssr: false,
});

const MainMap = ()  => {
	
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

			<div
				className={`${"MapView__Container"} ${style.map}`}
			>
				<MapView />

			</div>

            <div className={style.menu}>
                <div className={style.left}>
                    <h2>45%</h2> {/*Remplazar con valor actulizable  // {actualizable}%*/}
                    <TbBus className={style.bus} />
                </div>

                <div className={style.right}>
                    <div className={style.porcentaje}></div>
                </div>
            </div>    

			<div>
				<Offcanvas isOpen={offcanvasActive} toggle={toggleOffcanvas} >
					<OffcanvasHeader toggle={toggleOffcanvas} className={styleN.header_nav}>

                        <div className={styleN.user_container}>

                            <div className={styleN.user__img}>
								{/* <div className={styleN.container__img}>
									<Image
										src={"/User_icon.png"}
										height={400}
										width={400}
										alt="Perfil"
									/>
								</div> */}
                            </div>

                            <div className={styleN.user__info}>
                                <p>PEPE</p>
                            </div>

                        </div>

                    </OffcanvasHeader>
					<OffcanvasBody style={{padding: 0}}>
                    <button className={styleN.btn_nav}>
							<TbBus className={styleN.route}/>
							<p>Rutas</p>
						</button>
					</OffcanvasBody>
				</Offcanvas>
			</div>
		</div>
	</Layout>
	);
};

export default MainMap;
