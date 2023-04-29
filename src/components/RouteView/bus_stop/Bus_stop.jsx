import Link from "next/link";
import dynamic from "next/dynamic";
import { useContext } from "react";

//Estilos

import style from "../../../styles/Routes/routes_view.module.css";

// contextos

import MapContext from "@/contexts/MapContext";

// Componentes
import BotonPa from "./BotonPa";
import BotonPa_edit from "./BotonPa _edit";
import { Button } from "bootstrap";

import { IoIosAdd } from "react-icons/io";

export default function Bus_stop( {edit} ) {

  return (
    <>
      <div className={style.container_routes}>
        <h2>Paradas</h2>
        
        {edit && (<button className={style.add}><IoIosAdd /></button>)}

        {edit 
        ?
        <>
          <BotonPa_edit lugar="Terminal"  />
          <BotonPa_edit lugar="Villa olimpica" />
          <BotonPa_edit lugar="SAIME"  />
          <BotonPa_edit lugar="UNERG"/>
        </>
        :
        <>
          <BotonPa lugar="Terminal" km="0.0" />
          <BotonPa lugar="Villa olimpica" km="3.0" />
          <BotonPa lugar="SAIME" km="4.2" />
          <BotonPa lugar="UNERG" km="5.0" />
        </>
      }
       

      </div>
    </>
  );
}
