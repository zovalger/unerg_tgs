import Link from "next/link";
import dynamic from "next/dynamic";
import { useContext } from "react";

//Estilos

import style from "../../styles/Routes/routes_view.module.css"


// contextos

import MapContext from "@/contexts/MapContext";


// Componentes

import { IoIosAdd } from "react-icons/io";

import BotonRu from "./BotonRu";

export default function Routes(props){

    const { Rutas } = useContext(MapContext)

    return(
        <>
        <div className={style.container_routes}>
           <h2>Rutas disponibles</h2>
            {props.edit && (
                        <Link href={"./add"} className={style.add}>
                            <IoIosAdd />
                        </Link>
                    )}
            {Rutas.map((datos, id_1)=>{
                return(
                    <BotonRu 
                    key= {id_1}
                    datos = {datos}
                    />
                    )
            })}

        </div>
        </>
    )
}

