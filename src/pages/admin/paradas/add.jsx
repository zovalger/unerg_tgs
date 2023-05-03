//React-Next 
import dynamic from "next/dynamic";
import { useContext, useState } from "react";
import Link from "next/link";

//Componentes

import Layout from "@/layouts/Layout";
import NavBar from "@/components/common/NavBar";
import { BiLeftArrow, BiPencil } from "react-icons/bi";
import Add_parada from "@/components/forms/Add_parada";


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
							
                                        <Link href={"./menu"} className={styleN.btn_return}>
										<BiLeftArrow />
                                        </Link>
								
								</div>
								<div className={styleN.title_nav}>
								    <h2>Agregar parada</h2>
								</div>
	
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
						<Add_parada />
					</div>
	



				<div>
				</div>
			</div>
		</Layout>
	);
};

export default MainMap