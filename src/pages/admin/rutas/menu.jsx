//React-Next
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";

//Componentes

import Layout from "@/layouts/Layout";
import NavBar from "@/components/common/NavBar";
import { IoIosAdd, IoIosArrowBack } from "react-icons/io";
import Routes from "@/components/RouteView/Routes";

//Estilos
import styleN from "@/styles/Nav/NavStyle.module.css";
import style from "@/styles/Routes/routes_view.module.css";

//Contextos

import MapContext from "@/contexts/Map.context";

import UserContext from "@/contexts/User.context";
import BotonRu from "@/components/RouteView/BotonRu";
import RutaContext from "@/contexts/Ruta.context";
import { useRouter } from "next/router";
import { getAllRutas_Request } from "@/api/ruta.api";

import AsidePanel from "@/components/common/AsidePanel";

const MapView = dynamic(() => import("@/components/MapView_Leaflet/MapView"), {
	ssr: false,
});

const MainMap = () => {
	//useContext
	const { logout, user } = useContext(UserContext);

	const { toogleViewUserCoord, getCoordsUser, viewUserCoord, Rutas } =
		useContext(MapContext);

	const [offcanvasActive, setOffcanvasActive] = useState(false);
	const toggleOffcanvas = () => setOffcanvasActive(!offcanvasActive);

	const { rutas, insertRuta, setEditingRoute, getRuta } =
		useContext(RutaContext);

	const router = useRouter();

	useEffect(() => {
		getAllRutas_Request()
			.then((res) => insertRuta(res.data))
			.catch((error) => console.log(error));
	}, []);

	const onClick = (_id) => {
		setEditingRoute(getRuta(_id));
		router.push(`./${_id}`);
	};

	return (
		<Layout>
			<div className="AppView">
				{/* nav customizable */}

				<NavBar
					left={
						<>
							<div>
								<Link
									className={styleN.btn_return}
									href={"../map"}
								>
									<IoIosArrowBack />
								</Link>
							</div>
							<div className={styleN.title_nav}>
								<h2>Todas las Rutas</h2>
							</div>
						</>
					}
					right={<></>}
				/>

				{/* Contenedor del mapa */}

				<div className={`${"MapView__Container"} ${"MapView__ContainerRu"}`}>
					<MapView />
				</div>

				{/*Abrir vista de paradas*/}

				<div className="container__rutas">
					<div className={style.container_routes}>
						<h2>Rutas disponibles</h2>

						{true && (
							<Link
								href={"./create"}
								className={`${style.add} ${style.add__rutas}`}
							>
								<IoIosAdd />
							</Link>
						)}

						{rutas.map((datos, id_1) => {
							return <BotonRu key={id_1} datos={datos} onClick={onClick} />;
						})}
					</div>
				</div>
			</div>

			<AsidePanel
				toggleOffcanvas={toggleOffcanvas}
				offcanvasActive={offcanvasActive}
			/>
		</Layout>
	);
};

export default MainMap;
