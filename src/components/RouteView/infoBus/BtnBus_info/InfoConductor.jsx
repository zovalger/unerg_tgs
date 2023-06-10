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

const InfoCondcutor = ({ data }) => {
	const { _id, name, CI, bloodType, timetableId, perfilImg } = data;

	return (
		<div className={styles.container}>
			<div className={styles.container__img}>
				<div className={styles.imagen}>
					<img
						src={perfilImg.url ? perfilImg.url : "/User_icon.png"}
						alt="Imagen de perfil"
					/>
				</div>
			</div>

			<div className={styles.container__text}>
				<p>{name}</p>
				<p>{CI}</p>
				<p>Sangre: {bloodType}</p>
			</div>
		</div>
	);
};

export default InfoCondcutor;
