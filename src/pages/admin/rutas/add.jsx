//React-Next 
import dynamic from "next/dynamic";
import { useContext, useState } from "react";
import Link from "next/link";

//Componentes

import Layout from "@/layouts/Layout";
import NavBar from "@/components/common/NavBar";
import { IoIosArrowBack } from "react-icons/io";
import Add_ruta from "@/components/forms/Add_ruta";

//Estilos
import styleN from "../../../styles/Nav/NavStyle.module.css"


//Contextos 

import MapContext from "@/contexts/MapContext";

import UserContext from "@/contexts/UserProvider";





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


	return (
		<Layout>
			<div className="AppView">
				{/* nav customizable */}

					<NavBar
						left={
							<>
								<div>
							
                                        <Link href={"./menu"} className={styleN.btn_return}>
										<IoIosArrowBack />
                                        </Link>
								
								</div>
								<div className={styleN.title_nav}>
								    <h2>Agregar parada</h2>
								</div>
	
							</>
						}
						right={<></>}
					/>
			

					<div>
						<Add_ruta />
					</div>


	
			</div>
		</Layout>
	);
};

export default MainMap