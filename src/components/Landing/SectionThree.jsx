//React-Next
import Image from "next/image";

//Componentes

//Contextos

//Estilos

import styles from "@/styles/Landing/SectionThree.module.css";

const SectionThree = () => {
  return (
    <div className={styles.container}>
       <div className={styles.img}>
            <Image
                src={'/Bus_UNERG.jpg'}
                height={800}
                width={800}
                alt="Bus de la UNERG"
            />
       </div>
      <div className={styles.vector}>
        <Image src={"/Vector.svg"} width={800} height={800} alt="vector" />
        <div className={styles.text}>
          <h2>Sobre Nosotros</h2>
          <p>
            UNERG-TGS se desarrollo con el fin de facilitar toda la información
            necesaria al publico acerca del transporte universitario, a su vez
            facilitar el trabajo de la administración para la gestión y difusión
            de dicha información
          </p>
        </div>
      </div>
    </div>
  );
};

export default SectionThree;
