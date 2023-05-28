// React/Next

import Image from "next/image";
import Link from "next/link";

//Componentes

//Estilos

import styles from "@/styles/Users/admin/Admins/btn_admin.module.css";

//Contextos

//****************************  Codigo  *******************************//
const Btn_admin = ({ data, onClick }) => {
	//Contextos

	const { _id, name, phone, perfilImg } = data;
	//States

	//******************  Contenido  **************** //
	return (
		<>
			<div className={styles.btn} onClick={() => onClick(_id)}>
				<div className={styles.container__imagen}>
					<div className={styles.imagen}>
						<img
							src={perfilImg.url ? perfilImg.url : "/User_icon.png"}
							alt="Imagen de perfil"
						/>
					</div>
				</div>

				<div className={styles.text}>
					<h2>{name}</h2> {/* Heredar*/}
					<p>Teléfono: {phone} </p>
					{/* Heredar*/}
				</div>
			</div>
		</>
	);
};

export default Btn_admin;
