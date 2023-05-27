// React/Next

import Image from "next/image";
import Link from "next/link";

//Componentes

//Estilos

import styles from "@/styles/Users/admin/Conductores/btn_conductor.module.css";
import moment from "moment";

//Contextos

//****************************  Codigo  *******************************//
const Btn_conductor = ({ data, onClick }) => {
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
							{/* <Image
								src={perfilImg.url ? perfilImg.url : "/User_icon.png"} //Heredar
								height={600}
								width={600}
								alt="Imagen de perfil"
							/> */}
						</div>
					</div>

					<div className={styles.text}>
						<h2>{name}</h2> {/* Heredar*/}
						<p>Teléfono: {phone} </p>
						{/* Heredar*/}
						<p>
							Horario:{" "}
							{timetableId
								? `${timetableId.name}: ${moment(timetableId.startTime).format(
										"h:mm a"
								  )} - ${moment(timetableId.endTime).format("h:mm a")}`
								: "No asignado"}{" "}
						</p>
						{/* Heredar*/}
						<p>
							Unidad:{" "}
							{busId
								? `Numero "${busId.num}" - Placa "${busId.placa}"`
								: "No asignado"}
						</p>
						{/* Heredar*/}
					</div>
				</div>
			</div>
		</>
	);
};

export default Btn_conductor;
