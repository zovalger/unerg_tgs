import Link from "next/link";
import dynamic from "next/dynamic";
import { useContext } from "react";

//Estilos

import style from "../../styles/Routes/routes_view.module.css"


// contextos

import MapContext from "@/contexts/MapContext";




export default function Routes(){

    const { Rutas } = useContext(MapContext)

    console.log(Rutas);

    return(
        <>
        <div className={style.container_routes}>
           <h2>Rutas disponibles</h2>
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

function BotonRu( {datos} ){
    const { name, description } = datos
    console.log(datos)
    return(
        <>
            <div className= {style.botonRuta}>
                <div className={style.textContainer__Ru}>
                    <h2>{name}</h2>
                    <p>{description}</p>
                </div>
                 <div className={style.textContainer__Ho}>
                    <p>hora inical - hora final</p>
                </div>
            </div>
        </>
        )
}