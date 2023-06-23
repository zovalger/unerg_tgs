// librerias y hooks
import { useContext, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

// componentes de otras librerias
import { GoLocation } from "react-icons/go";
import { TbRoute } from "react-icons/tb";
import { RxHamburgerMenu } from "react-icons/rx";

import { Button, Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";

// contextos
import MapContext from "@/contexts/Map.context";
import UserContext from "@/contexts/User.context";
import RutaContext from "@/contexts/Ruta.context";
import { getAllRutas_Request } from "@/api/ruta.api";

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
	const router = useRouter();
	//useContext

	// const { logout, user } = useContext(UserContext);

	const { toogleViewUserCoord, getCoordsUser, viewUserCoord, Rutas } =
		useContext(MapContext);

	//useState

	const [offcanvasActive, setOffcanvasActive] = useState(false);
	const toggleOffcanvas = () => setOffcanvasActive(!offcanvasActive);

	// const [ro_active, setRo_active] = useState(false);
	// const Ro_Btn = useCallback(() => {
	// 	setRo_active(prevRo_active => !prevRo_active);
	//   }, []);

	
	const onClick = (_id) => {
		setEditingRoute(getRuta(_id));
		router.push(`./rutas/${_id}`);
	};
	//Rutas del panel
	const { rutas, insertRuta, setEditingRoute, getRuta } =
		useContext(RutaContext);

	useEffect(() => {
		getAllRutas_Request()
			.then((res) => insertRuta(res.data))
			.catch((error) => console.log(error));
	}, []);

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
				>
					<MapView />

					{/*Contenedor desplegable de las rutas*/}
{/* 
					{ro_active && (
						<div className={style.Route_view}>
							<h2>Rutas</h2>
							{rutas.map((datos, id_1) => {
								return <BotonRu key={id_1} datos={datos} onClick = {onClick}/>;
							})}
						</div>
					)} */}
				</div>

				{/* botones inferiores */}

				<ButtonFloatingContainer>
					{/* <Button color="primary">
						<TbRoute onClick={Ro_Btn} />
					</Button> */}

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
					location={true}
				/>
			</div>
		</Layout>
	);
};



export default MainMap;
