import Link from "next/link";
import dynamic from "next/dynamic";
import { useContext } from "react";

//Estilos

import style from "../../../styles/Routes/routes_view.module.css";

// contextos

import MapContext from "@/contexts/MapContext";

// Componentes
import BotonPa from "./BotonPa";

export default function Bus_stop() {
  const { Rutas } = useContext(MapContext);

  return (
    <>
      <div className={style.container_routes}>
        <h2>Paradas</h2>
        
        <BotonPa lugar="Terminal" km="0.0" />
        <BotonPa lugar="Villa olimpica" km="3.0" />
        <BotonPa lugar="SAIME" km="4.2" />
        <BotonPa lugar="UNERG" km="5.0" />

      </div>
    </>
  );
}
