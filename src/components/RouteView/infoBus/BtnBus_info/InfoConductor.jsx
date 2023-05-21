//React-Next

import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";

//Componentes

import { TbBus } from "react-icons/tb";

//Estilos

import styles from "@/styles/Routes/admin/InfoConductor.module.css";

//Contextos

//**********************************  Codigo  ************************//

const InfoCondcutor = () => {
  return (
    <div className={styles.container}>

      <div className={styles.container__img}>

        <div className={styles.imagen}>
          <Image
            src={"/User_icon.png"}
            width={400}
            height={400}
            alt="Imagen de perfil"
          />
        </div>

      </div>

      <div className={styles.container__text}>
        <p>Marcelo Carabaño</p>
        <p>V-12.357.123</p>
        <p>Sangre DATO</p>
      </div>

    </div>
  );
};

export default InfoCondcutor;
