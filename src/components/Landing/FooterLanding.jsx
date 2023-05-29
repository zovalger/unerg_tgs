//React-Next

import Link from "next/link";
import Image from "next/image"

//Estilos

import styles from "@/styles/Landing/footer.module.css"

const FooterLanding = () => {
    return(
        <div className={styles.container}>
            <div className={styles.footer}>{/* column / row*/}
                
                <div className={styles.container__presentacion}>

                    <h2>UNERG-TGS</h2>

                </div>

                <div className={styles.container__nosotros}>

                <h2>Empresa</h2>
                <Link href={"https://unerg.edu.ve/"} target="_blank">Sobre nosotros</Link>

                </div>

                <div className={styles.container__redes}>

                <h2>Nuestras redes sociales</h2>
                <div className={styles.redes}>
                    <Link href={"https://www.facebook.com/oficial.unerg"} target="_blank" className={styles.icon}>
                        <Image
                            src={"./Landing/footer/facebook.svg"}
                            width={400}
                            height={400}
                            alt="Logo Facebook"
                        />

                    </Link>


                    <Link href={"https://twitter.com/OficialUnerg"} target="_blank" className={styles.icon}>
                    <Image
                            src={"./Landing/footer/twitter.svg"}
                            width={400}
                            height={400}
                            alt="Logo Twitter"
                        />

                    </Link>

                    <Link href={"https://www.instagram.com/oficial_unerg/"} target="_blank" className={styles.icon}>
                    <Image
                            src={"./Landing/footer/instagram.svg"}
                            width={400}
                            height={400}
                            alt="Logo instagram"
                        />

                    </Link>
                </div>


                </div>

            </div> 
            <div className={styles.copyright}>
                <h2>Copyright © 2023 UNERG-TGS. - Todos los Derechos Reservados.</h2>
            </div>
        </div>
    )
}

export default FooterLanding