//React-Next
import { useState } from "react"

//Componentes


import { TbBus } from "react-icons/tb"
import { GrCaretNext } from "react-icons/gr"
import { FiUsers } from "react-icons/fi"


//Estilos

import styles from "@/styles/Routes/admin/btnBus.module.css"
import { set } from "mongoose"
//Contextos





//*************************** Codigo  ************************/
export default function BtnBus(){

    const [porcentaje, SetPorcentaje] = useState(0); //temporal

    const SumNum = ( ) =>{
        if(porcentaje < 100) SetPorcentaje(porcentaje + 5);
    }

    return(
        <>

        <div className={styles.container}>
            <div className={styles.container__icon}>

                <TbBus className={styles.icon_bus}/>

            </div>


            <div className={styles.container__info}>

                    <div className={styles.top}>
                        <h2>Unidad 404 </h2> {/* Heredar */}
                        <p>6 km</p> {/* Heredar */}

                    </div>
                    <div className={styles.bottom}>

                        <div className={styles.container__icon}>

                            <FiUsers className={styles.icon_user}/>

                        </div>

                        <div className={styles.container_porcentaje} onClick={SumNum}>
                             <div className={styles.porcentaje} style={{ width:`${porcentaje}%`}}></div>  {/* Heredar */}
                        </div>


                        <div className={styles.text}>

                           <p>{porcentaje}%</p> {/* Heredar */}

                        </div>

                    </div>

            </div>

            <div className={styles.container__icon}>
            
            <GrCaretNext className={styles.icon_next}/>

            </div>
        </div>

        </>
    )
}