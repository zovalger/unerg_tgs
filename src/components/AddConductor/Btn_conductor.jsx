// React/Next

import Image from "next/image";
import Link from "next/link";


//Componentes



//Estilos

import styles from "@/styles/Conductores/btn_conductor.module.css"


//Contextos




//****************************  Codigo  *******************************//
const Btn_conductor = () =>{
    
    //Contextos

    //States

    //******************  Contenido  **************** //
    return(
        <>
            <div className={styles.container}>

                <div className={styles.btn}>

                    <div className={styles.container__imagen}>

                        <div className={styles.imagen}>
                        <Image 
                        src={"/User_icon.png"} //Heredar
                        height={600}
                        width={600}
                        alt="Imagen de perfil"
                        />
                        </div>

                    </div>

                    <div className={styles.text}>

                        <h2>Marcelo Carabeño</h2> {/* Heredar*/}

                        <p>Teléfono: </p>{/* Heredar*/}
                        <p>Horario: </p>{/* Heredar*/}
                        <p>Unidad: </p>{/* Heredar*/}

                    </div>


                </div>

            </div>
        </>
    )
}

export default Btn_conductor