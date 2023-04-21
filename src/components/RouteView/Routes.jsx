import Link from "next/link";
import dynamic from "next/dynamic"

//Estilos

import style from "../../styles/Routes/routes_view.module.css"


//componentes

export default function Routes(){

    return(
        <>
        <div className={style.container_routes}>
           <h2>Rutas disponibles</h2>
          <BotonRu />
           <BotonRu />
           <BotonRu />
             <BotonRu />
               <BotonRu />
                 <BotonRu />
                   <BotonRu />

        </div>
        </>
    )
}

function BotonRu(){
    return(
        <>
            <div className= {style.botonRuta}>
                <div className={style.textContainer__Ru}>
                    <h2>nombre de la ruta</h2>
                    <p>inicio - fin</p>
                </div>
                 <div className={style.textContainer__Ho}>
                    <p>hora inical - hora final</p>
                </div>
            </div>
        </>
        )
}