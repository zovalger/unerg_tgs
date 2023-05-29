//React-Next
import Image from "next/image";

//Estilos

import styles from "@/styles/Landing/SectionTwo.module.css";

const SectionTwo = () => {
  return (
    <div className={styles.container}>
      <h2>Nuestros Servicios</h2>

      <div className={styles.container__services}>
        <div className={styles.service}>
          <div className={styles.image}>
            <Image
              src={"./Landing/section2/geolocalizacion.svg"}
              height={500}
              width={500}
              alt="Icono del servicio"
            />
          </div>
          <div className={styles.text}>
            <h3>Geolocalización</h3>
            <p>
              Podra ubicar su posición dentro del mapa del sistema con solo
              darle a un boton
            </p>
          </div>
        </div>

        <div className={styles.service}>
          <div className={styles.image}>
            <Image
              src={"./Landing/section2/rutas.svg"}
              height={500}
              width={500}
              alt="Icono del servicio"
            />
          </div>
          <div className={styles.text}>
            <h3>Rutas</h3>
            <p>
              Obtenga toda la información referente a las rutas de la UNERG,
              como sus paradas y la unidades asignadas a la ruta
            </p>
          </div>
        </div>

        <div className={styles.service}>
          <div className={styles.image}>
            <Image
              src={"./Landing/section2/paradas.svg"}
              height={500}
              width={500}
              alt="Icono del servicio"
            />
          </div>
          <div className={styles.text}>
            <h3>Paradas</h3>
            <p>
              Obtenga de manera fácil, todas las paradas que circulan las rutas
              de la UNERG, ubique ahora su parada más cercana
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionTwo;
