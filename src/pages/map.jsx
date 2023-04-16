// librerias y hooks
import { useState } from "react";
import dynamic from "next/dynamic";

// componentes de otras librerias
import { GoLocation } from "react-icons/go";
import { TbRoute } from "react-icons/tb"; 
import { RxHamburgerMenu } from "react-icons/rx";
import { Button, Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";

// my components
import ButtonFloatingContainer from "@/components/common/ButtonFloating_Container";
import NavBar from "@/components/common/NavBar";

import style from '../styles/Routes/routes_view.module.css'

const MapView = dynamic(
	() => import("@/components/MapView_Leaflet/MapView"),
	{
		ssr: false,
	}
);

const MainMap = () => {
	const [offcanvasActive, setOffcanvasActive] = useState(false);

	const toggleOffcanvas = () => setOffcanvasActive(!offcanvasActive);

	const [ro_active, setRo_active] = useState(false);

	const Ro_Btn = () =>{ 
		setRo_active(!ro_active)
	}

	return (
		<div className="AppView">
			{/* nav customizable */}
			<NavBar
				left={
					<div color="primary" onClick={toggleOffcanvas}>
						<RxHamburgerMenu />
					</div>
				}
				title={"Vista de mapa"}
				right={<></>}
			/>

			{/* contenedor del mapa */}

			<div className="MapView__Container" onClick={()=>{setRo_active(false)}}>
				<MapView />
				{/*Contenedor de las rutas*/}
			{ro_active ? 
			<div className={style.Route_view}>
				<h2>Rutas</h2>
				<ul>{/*Aqui ira un map para el componente de la lista de rutas*/}
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
			: undefined}
			</div>

			{/* botones inferiores */}

			<ButtonFloatingContainer>
			<Button color="primary">
					<TbRoute  onClick={Ro_Btn}/>
				</Button>
				<Button color="primary">
					<GoLocation />
				</Button>
			</ButtonFloatingContainer>

			{/* panel lateral desplegable */}

			<div>
				<Offcanvas isOpen={offcanvasActive} toggle={toggleOffcanvas}>
					<OffcanvasHeader toggle={toggleOffcanvas}>Offcanvas</OffcanvasHeader>
					<OffcanvasBody>
						<strong>This is the Offcanvas body.</strong>
					</OffcanvasBody>
				</Offcanvas>
			</div>

			

		</div>
	);
};

export default MainMap;
