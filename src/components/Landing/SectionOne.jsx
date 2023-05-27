//React-Next

import Image from "next/image"
import Link from "next/link"

//Estilos

import styles from "@/styles/Landing/SectionOne.module.css"


const SectionOne = () =>{


    return(
        <div className={styles.container}>
            <div className={styles.text}>
                <h2>UNERGT-TGS</h2>
                <p>Mantente informado acerca de las rutas y paradas disponibles en tu zona, comienza a utilizar nuestras funciones.</p>
                <Link href={"./map"} className={styles.btn}>
                    Comienza ya
                </Link>
            </div>
            <div className={styles.image}>
                <Image
                src={"./Landing/section1.svg"}
                height={500}
                width={500}
                alt="UNERG-TGS"
                />
            </div>
        </div>
    )
}

export default SectionOne