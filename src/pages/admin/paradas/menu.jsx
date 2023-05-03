//React-Next 
import dynamic from "next/dynamic";
import { useContext, useState } from "react";
import Link from "next/link";

//Componentes

import Layout from "@/layouts/Layout";
import NavBar from "@/components/common/NavBar";
import { BiLeftArrow, BiPencil } from "react-icons/bi";
import Bus_stop from "@/components/RouteView/bus_stop/Bus_stop";


//Estilos
import styleN from "../../../styles/Nav/NavStyle.module.css"


//Contextos 

import MapContext from "@/contexts/MapContext";

import UserContext from "@/contexts/UserProvider";


const MapView = dynamic(() => import("@/components/MapView_Leaflet/MapView"), {
	ssr: false,
});


const MainMap = () => {
	

//useContext
const { logout, user } = useContext(UserContext);

	const {
		toogleViewUserCoord,
		getCoordsUser,
		viewUserCoord,

		Rutas,
	} = useContext(MapContext);



//useState

const [edit, setEdit] = useState(false);

const btn_edit = () => {
    setEdit(!edit);
};

	return (
		<Layout>
			<div className="AppView">
				{/* nav customizable */}

					<NavBar
						left={
							<>
								<div>
					
									<Link className={styleN.btn_return} href={"../map"}>
                                       
										<BiLeftArrow />
                                        
									</Link>
							
								</div>
								<div className={styleN.title_nav}>
								    <h2>Todas las paradas</h2>
								</div>
								{user
									? user.role == "admin" && (
											<div className={styleN.btn_edit} onClick={btn_edit}>
												<BiPencil />
											</div>
									  )
									: ""}
							</>
						}
						right={<></>}
					/>
			

				{/* Contenedor del mapa */}

				<div
					className= {`${"MapView__Container"} ${"MapView__ContainerRu"}`}
				>
					<MapView />

				</div>


				{/*Abrir vista de paradas*/}

				
					<div className="container__rutas">
						<Bus_stop edit={edit}/>
					</div>
	



				<div>
				</div>
			</div>
		</Layout>
	);
};

export default MainMap