import Link from "next/link";
import dynamic from "next/dynamic"

//Estilos




//componentes

import NavBar from "@/components/common/NavBar";

const MapView = dynamic(
	() => import("@/components/MapView_Leaflet/MapView"),
	{
		ssr: false,
	}
);

export default function Routes(){

    return(
        <>
        <div className="AppView">
            <div className="Map_container">

                <MapView />

            </div>
          
        </div>
        </>
    )
}