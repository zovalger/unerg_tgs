// React/Next

import Link from "next/link";

//Componentes

//Estilos

import styles from "@/styles/Users/admin/Conductores/btn_conductor.module.css";
import moment from "moment";

//Contextos

//****************************  Codigo  *******************************//
const BtnMessages = ({ data, onClick }) => {
	const { _id, name, phone, perfilImg, busId, timetableId } = data;
	//Contextos

	//States

	//******************  Contenido  **************** //
	return (
		<>
			<div className={styles.container} onClick={() => onClick(_id)}>
				<div className={styles.btn}>
					<div className={styles.container__imagen}>
						<div className={styles.imagen}>
							<img
								src={perfilImg.url ? perfilImg.url : "/User_icon.png"}
								alt="Imagen de perfil"
							/>
						</div>
					</div>

					<div className={styles.text}>
						<h2>{name}</h2> 
						<p>Teléfono: {phone} </p>
	
						<p>
							Unidad:{" "}
							{busId
								? `Numero "${busId.num}" - Placa "${busId.placa}"`
								: "No asignado"}
						</p>

					</div>
				</div>
			</div>
		</>
	);
};

export default BtnMessages;