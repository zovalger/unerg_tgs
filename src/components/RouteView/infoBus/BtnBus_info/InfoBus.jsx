//React-Next

import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";

//Componentes


import { TbBus } from "react-icons/tb"

//Estilos

import styles from "@/styles/Routes/admin/InfoBus.module.css"

//Contextos

//**********************************  Codigo  ************************//
const InfoBus = () =>{

    return(
        <div className={styles.container}>

            <div className={styles.container__icon}>
                <TbBus/>
            </div>

            <div className={styles.container__text}>
                <p>Nombre: Unidad 504</p>
                <p>Placa: AA00817H</p>
            </div>

        </div>
    )
}

export default InfoBus